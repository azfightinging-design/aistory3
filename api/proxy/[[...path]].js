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
		const originalUrl = req.url || '';
		// 提取 /api/proxy 后的子路径，可能为空
		let subPath = originalUrl.replace(/^\/api\/proxy\/?/, '');

		// 规范化：去掉开头的斜杠
		subPath = subPath.replace(/^\//, '');

		// 目标基础前缀
		const apiPrefix = 'https://ark.cn-beijing.volces.com/api/v3';

		// 如果 subPath 已经以 api/v3/ 开头，避免重复拼接
		let targetUrl = subPath.startsWith('api/v3/')
			? `https://ark.cn-beijing.volces.com/${subPath}`
			: `${apiPrefix}/${subPath}`;

		// 如果完全没有子路径，则给出健康检查/说明
		if (!subPath) {
			res.setHeader('x-proxy-target-url', apiPrefix);
			res.status(200).json({ status: 'ok', message: 'Proxy is up. Append a path, e.g. /chat/completions', target: apiPrefix });
			return;
		}

		// 记录调试头
		res.setHeader('x-proxy-target-url', targetUrl);

		const response = await fetch(targetUrl, {
			method: req.method,
			headers: {
				'Content-Type': req.headers['content-type'] || 'application/json',
				'Authorization': req.headers.authorization || ''
			},
			// 仅在非GET时转发 body（Vercel Node函数会解析 JSON 到 req.body）
			body: req.method && req.method.toUpperCase() !== 'GET' && req.body ? JSON.stringify(req.body) : undefined
		});

		res.status(response.status);
		const contentType = response.headers.get('content-type') || '';
		if (contentType.includes('application/json')) {
			const data = await response.json();
			res.json(data);
			return;
		}
		const text = await response.text();
		res.setHeader('Content-Type', contentType || 'text/plain; charset=utf-8');
		res.send(text);
	} catch (error) {
		console.error('Proxy error:', error);
		res.status(500).json({ error: 'Internal server error', message: error?.message || 'unknown' });
	}
}


