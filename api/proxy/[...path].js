export default async function handler(req, res) {
	// CORS
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

	if (req.method === 'OPTIONS') {
		res.status(200).end();
		return;
	}

	try {
		// 捕获所有子路径: /api/proxy/<...path>
		// 在 Vercel Node 函数中，可以通过 req.url 获得原始路径
		// 我们期望形如 /api/proxy/chat/completions 或 /api/proxy/images/generations
		const originalUrl = req.url || '';
		const subPath = originalUrl.replace(/^\/api\/proxy\/?/, '');

		// 始终转发到火山引擎 /api/v3 前缀
		const targetUrl = `https://ark.cn-beijing.volces.com/api/v3/${subPath}`.replace(/\/+$/, '');
		
		const response = await fetch(targetUrl, {
			method: req.method,
			headers: {
				'Content-Type': req.headers['content-type'] || 'application/json',
				'Authorization': req.headers.authorization || ''
			},
			// 仅在非GET时转发 body
			body: req.method && req.method.toUpperCase() !== 'GET' ? JSON.stringify(req.body || {}) : undefined
		});

		// 透传状态码
		res.status(response.status);

		// 火山接口一般返回 JSON
		const contentType = response.headers.get('content-type') || '';
		if (contentType.includes('application/json')) {
			const data = await response.json();
			res.json(data);
			return;
		}
		
		// 兜底为文本
		const text = await response.text();
		res.setHeader('Content-Type', contentType || 'text/plain; charset=utf-8');
		res.send(text);
	} catch (error) {
		console.error('Proxy error:', error);
		res.status(500).json({ error: 'Internal server error', message: error?.message || 'unknown' });
	}
}
