# 绘梦AI屋 - AI绘本生成器

一个基于火山引擎AI的儿童绘本生成应用，支持文本生成和AI绘图。

## 功能特性

- 🎨 AI绘本故事生成
- 🖼️ AI插画生成
- 📱 响应式设计，支持移动端
- 🔧 高级模式：可自定义主角、场景、主题、结局
- 📖 交互式绘本查看器
- 🌐 支持本地开发和Vercel部署

## 技术架构

- **前端**: HTML5 + CSS3 + JavaScript (ES6+)
- **后端**: Node.js + Express (本地开发)
- **部署**: Vercel Functions (生产环境)
- **AI服务**: 火山引擎 (豆包大模型 + 豆包绘图)

## 快速开始

### 本地开发

1. 安装依赖
```bash
npm install
```

2. 启动本地服务器
```bash
npm start
```

3. 访问应用
```
http://localhost:3000
```

### Vercel部署

1. 推送到GitHub
```bash
git add .
git commit -m "准备Vercel部署"
git push origin main
```

2. 在Vercel上部署
   - 访问 [vercel.com](https://vercel.com)
   - 连接GitHub仓库
   - 自动部署

## 项目结构

```
├── api/
│   └── proxy.js          # Vercel函数，用于代理API请求
├── index.html            # 主页面
├── script.js             # 前端逻辑
├── styles.css            # 样式文件
├── server.js             # 本地开发服务器
├── vercel.json           # Vercel配置
├── package.json          # 项目配置
└── README.md             # 项目说明
```

## 环境配置

### 本地开发
- 使用 `http://localhost:3000/api/v3` 访问本地代理服务器
- 需要运行 `npm start` 启动本地服务器

### Vercel生产环境
- 使用 `/api/proxy` 访问Vercel函数
- 自动环境检测，无需手动配置

## API密钥配置

在 `script.js` 中配置你的火山引擎API密钥：

```javascript
const ARK_API_KEY = 'your-api-key-here';
```

## 使用说明

1. 输入故事创意
2. 选择页数 (1-50页)
3. 可选：开启高级模式，自定义更多参数
4. 点击"生成绘本"
5. 等待AI生成故事和插画
6. 在绘本查看器中浏览结果

## 故障排除

### 常见问题

1. **API连接失败**
   - 检查API密钥是否正确
   - 确认网络连接正常
   - 查看浏览器控制台错误信息

2. **图片生成失败**
   - 检查火山引擎服务状态
   - 确认API配额是否充足

3. **部署问题**
   - 检查Vercel部署日志
   - 确认所有文件都已推送

### 调试方法

1. 使用 `test.html` 页面测试API连接
2. 查看浏览器开发者工具的控制台
3. 检查网络请求的状态和响应

## 贡献

欢迎提交Issue和Pull Request！

## 许可证

MIT License
