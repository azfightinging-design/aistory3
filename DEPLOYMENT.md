# 绘梦AI屋 - Vercel部署指南

## 部署步骤

### 1. 推送到GitHub
```bash
git add .
git commit -m "准备Vercel部署"
git push origin main
```

### 2. 在Vercel上部署
1. 访问 [vercel.com](https://vercel.com)
2. 使用GitHub账号登录
3. 点击 "New Project"
4. 选择你的GitHub仓库
5. 保持默认设置，点击 "Deploy"

### 3. 环境变量配置（可选）
如果需要，可以在Vercel项目设置中添加环境变量：
- `ARK_API_KEY`: 你的火山引擎API密钥

## 文件结构说明

- `api/proxy.js` - Vercel函数，用于代理API请求
- `vercel.json` - Vercel配置文件
- `script.js` - 前端逻辑，已配置为自动检测环境
- `index.html` - 主页面
- `styles.css` - 样式文件

## 工作原理

1. **本地开发**: 使用 `http://localhost:3000/api/v3` 访问本地代理服务器
2. **Vercel生产环境**: 使用 `/api/proxy` 访问Vercel函数
3. **自动环境检测**: 代码会根据当前域名自动选择正确的API地址

## 注意事项

- 确保你的火山引擎API密钥是有效的
- Vercel函数有30秒的超时限制
- 本地开发时仍需要运行 `npm start` 来启动代理服务器

## 故障排除

如果遇到问题：
1. 检查Vercel部署日志
2. 确认API密钥是否正确
3. 检查浏览器控制台是否有错误信息
4. 验证CORS设置是否正确
