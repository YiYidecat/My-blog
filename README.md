# Vue 3 + Vite 博客系统

1. 这是一个基于 Vue 3、Vite、Element Plus 和 Pinia 构建的博客系统。该项目也搭载了一个简单的展示个人简历的入口，用户可以在博客系统中查看和下载简历。
2. 该项目有两种调取数据的方式，当在本地运行的时候，数据会从本地的 `json-server` 获取；当部署到 GitHub Pages 上时，数据会从静态的 JSON 文件获取。具体的配置看request.js文件中的baseURL配置。
3. 项目使用了 Hash 路由以兼容 GitHub Pages 的部署方式，API 请求会根据环境自动切换到适当的端点。在 GitHub Pages 上，API 数据来自静态 JSON 文件。
4. 你可以查看项目的[在线演示](https://yiyidecat.github.io/My-blog/)。

## 本地开发

！！！！！！！！注意：运行项目前请先启动后端API服务：json-server --watch db.json --port 3000。

### 1. 安装依赖
```bash
npm install -g json-server
npm install
```

### 2. 启动后端API服务
```bash
# 方法1：使用npm脚本
npm run server

# 方法2：手动启动
json-server --watch db.json --port 3000
```

### 3. 启动前端开发服务器
```bash
npm run dev
```

## 部署到 GitHub Pages

### 方式1：使用 GitHub Actions（推荐）

1. 确保仓库名为 `yourusername.github.io` 或者 `your-repo-name`
2. 将代码推送到 `master` 分支
3. GitHub Actions 会在 `.github/workflows/deploy.yml` 中自动构建并部署
## 注意！！！！
## 以后若是需要修改静态数据，只需要在master分支下对public->api下的json文件进行修改即可，修改后npm run build然后提交到远程仓库会自动触发deploy.yml文件部署流程，并更新gh-pages分支上的数据。

### 方式2：手动部署

1. 构建项目：
```bash
npm run build
```

2. 将 `dist` 目录中的内容部署到 GitHub Pages

### 注意事项
- 本项目使用 Hash 路由以兼容 GitHub Pages
- API 请求会根据环境自动切换到适当的端点
- 在 GitHub Pages 上，API 数据来自静态 JSON 文件

## 项目结构
src/
├── api/               # 接口请求
│   └── 
├── components/        # 可复用组件
│   ├── ArticleCard.vue
│   └── CommentList.vue
├── views/             # 页面视图
│   ├── HomeView.vue   # 文章列表
│   ├── PostView.vue   # 文章详情
│   └── LoginView.vue  # 登录页
├── store/             # Pinia状态管理
│   ├── userStore.js   # 用户登录状态
│   └── postStore.js   # 文章数据
├── utils/               # 工具函数
│   └── request.js     # 统一请求拦截器
├── router/            # Vue Router
│   └── index.js       # 路由配置
└── App.vue            # 根组件

## 墨语博客开发指南

## 1. 登录功能（需实现）
- **API**: `POST /login` (body: { username, password })
- **业务逻辑**:
  1. 用户输入用户名密码 → 调用API
  2. 成功后存储token到Pinia `userStore`
  3. 跳转到首页（需路由守卫）

## 2. 文章列表（需实现）
- **API**: `GET /posts`
- **需求**:
  - 分页加载（每页10条）
  - 支持分类筛选（前端过滤）
  - 点赞按钮：点击后调用 `POST /posts/:id/like`，更新文章likes

## 3. 文章详情（需实现）
- **API**: `GET /posts/:id`
- **需求**:
  - 显示文章内容（富文本渲染）
  - 评论区：输入框 + 发表按钮
  - 发表评论：调用 `POST /posts/:id/comments`，添加到评论列表

## 4. 技术亮点（推荐实现）
- ✨ **虚拟滚动**：文章列表用 `el-virtual-list`（Element Plus组件）
- ✨ **评论防抖**：发表评论时防抖处理（避免重复请求）
- ✨ **状态管理**：用Pinia统一管理用户登录态