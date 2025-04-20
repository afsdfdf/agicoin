# AGICOIN

AGICOIN 是一个基于 React 和 TypeScript 构建的加密货币平台，提供 AI 投资、质押、游戏和 NFT 市场等功能。

## 功能特点

- **AI 投资平台**：智能投资策略，稳健收益
- **质押系统**：质押 AGI 代币获取收益
- **游戏中心**：玩游戏赚取 AGI 代币
- **交易平台**：加密货币交易
- **NFT 市场**：购买和交易 NFT

## 技术栈

- React 18
- TypeScript
- React Router
- Styled Components
- Lightweight Charts
- React Icons

## 安装与运行

### 前提条件

- Node.js 14.0 或更高版本
- npm 6.0 或更高版本

### 安装步骤

1. 克隆仓库

```bash
git clone https://github.com/yourusername/agicoin.git
cd agicoin
```

2. 安装依赖

```bash
npm install
```

3. 启动开发服务器

```bash
npm start
```

4. 构建生产版本

```bash
npm run build
```

## 部署

### 使用 Vercel 部署

1. 在 [Vercel](https://vercel.com/) 注册账号
2. 导入 GitHub 仓库
3. 配置环境变量（如有需要）
4. 点击部署

### 使用 Netlify 部署

1. 在 [Netlify](https://www.netlify.com/) 注册账号
2. 导入 GitHub 仓库
3. 配置构建命令：`npm run build`
4. 配置发布目录：`build`
5. 点击部署

### 使用 GitHub Pages 部署

1. 在 package.json 中添加 homepage 字段：`"homepage": "https://yourusername.github.io/agicoin"`
2. 安装 gh-pages 包：`npm install --save-dev gh-pages`
3. 在 package.json 的 scripts 中添加部署脚本：
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d build"
   ```
4. 运行部署命令：`npm run deploy`

## 项目结构

```
agicoin/
├── public/              # 静态资源
│   ├── images/          # 图片资源
│   ├── index.html       # HTML 模板
│   └── ...
├── src/                 # 源代码
│   ├── components/      # 可复用组件
│   ├── context/         # React Context
│   ├── pages/           # 页面组件
│   ├── telegram/        # Telegram 集成
│   ├── types/           # TypeScript 类型定义
│   ├── App.tsx          # 应用入口
│   ├── index.tsx        # 渲染入口
│   └── ...
├── package.json         # 项目配置
├── tsconfig.json        # TypeScript 配置
└── README.md            # 项目说明
```

## 贡献指南

1. Fork 仓库
2. 创建功能分支：`git checkout -b feature/your-feature-name`
3. 提交更改：`git commit -m 'Add some feature'`
4. 推送到分支：`git push origin feature/your-feature-name`
5. 提交 Pull Request

## 许可证

[MIT](LICENSE) 