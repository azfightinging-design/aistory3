const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// 启用CORS
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// 解析 JSON 请求体
app.use(express.json());

// 静态文件服务
app.use(express.static('.'));

// 代理火山引擎API
app.use('/api/v3', async (req, res) => {
    try {
        // 获取目标路径
        const targetPath = req.url;
        const targetUrl = `https://ark.cn-beijing.volces.com/api/v3${targetPath}`;

        console.log('Proxying request to:', targetUrl);

        // 转发请求到火山引擎
        const response = await fetch(targetUrl, {
            method: req.method,
            headers: {
                'Content-Type': req.headers['content-type'] || 'application/json',
                'Authorization': req.headers.authorization || '',
            },
            body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
        });

        const data = await response.json();
        
        // 设置响应状态和头
        res.status(response.status);
        
        // 返回数据
        res.json(data);
    } catch (error) {
        console.error('Proxy error:', error);
        res.status(500).json({ error: 'Internal server error', message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`本地开发服务器运行在 http://localhost:${PORT}`);
    console.log('现在可以通过 http://localhost:3000 访问应用');
    console.log('API代理地址: http://localhost:3000/api/v3');
});
