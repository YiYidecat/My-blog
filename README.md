# Vue 3 + Vite 博客系统

1. 这是一个基于 Vue 3、Vite、Element Plus 和 Pinia 构建的博客系统。该项目也搭载了一个简单的展示个人简历的入口，用户可以在博客系统中查看和下载简历，同时还集成了一个基于AI（调用DeepSeek API和Ollama本地部署大模型）的智能问答功能，用来处理AKN4UN XML格式的文档，该模块被集成到了写文章的页面当中，需要用户登录才能使用，拉取该项目之后需要你自己在config->aiConfig
文件当中部署自己的DeepSeek API密钥或者Ollama本地部署大模型的URL。
2. 该项目有两种调取数据的方式，当在本地运行的时候，数据会从本地的 `json-server` 获取；当部署到 GitHub Pages 上时，数据会从静态的 JSON 文件获取。具体的配置看request.js文件中的baseURL配置。
3. 项目使用了 Hash 路由以兼容 GitHub Pages 的部署方式，API 请求会根据环境自动切换到适当的端点。在 GitHub Pages 上，API 数据来自静态 JSON 文件。
4. 你可以查看项目的[在线演示](https://yiyidecat.github.io/My-blog/)，但是由于我没有上传我的DeepSeek API密钥，所以在线使用智能问答功能时会报错，并且由于该网站只能展示静态资源，所以发布文章和与ai交互的功能是不能在线使用的。

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

### 4. 用户登录
可以使用以下测试账号登录：
- 用户名：`前端小白`  
- 密码：`frontend123`


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

## 5. AI 助手配置

本项目集成了智能 AI 助手，支持多种 AI 模型提供商，包括云端模型和本地模型。

### 5.1 支持的 AI 提供商

#### 云端模型
- **DeepSeek**：高性能的中文 AI 模型，适合复杂文档处理
- **Kimi**：月之暗面开发的大模型（API 接口暂未开放）

#### 本地模型
- **Ollama**：支持本地运行的各种开源模型，保护数据隐私

### 5.2 配置 DeepSeek API 密钥

为安全起见，API 密钥应存储在环境变量中：

1. 在项目根目录创建 `.env.local` 文件：
   ```bash
   # 手动创建文件，内容如下：
   VITE_DEEPSEEK_API_KEY=sk-your-actual-deepseek-api-key-here
   ```

2. 重启开发服务器：
   ```bash
   npm run dev
   ```

**注意**：环境变量必须以 `VITE_` 开头才能在 Vite 项目中访问，且 `.env.local` 文件会被 `.gitignore` 忽略，不会提交到代码仓库。

### 5.3 配置 Ollama 本地模型

1. **安装 Ollama**：
   - 访问 [Ollama 官网](https://ollama.ai/) 并下载适合您系统的版本
   - 安装并启动 Ollama 服务
   - 确认服务运行在默认端口 `http://localhost:11434`

2. **拉取推荐的中文模型**：
   ```bash
   # 拉取 Qwen2.5 模型（适合中文处理）
   ollama pull qwen2.5:7b
   
   # 或者拉取其他中文友好的模型
   ollama pull llama3:8b
   ollama pull gemma2:2b
   ```

3. **启动 Ollama 服务**：
   ```bash
   ollama serve
   ```

### 5.4 在应用中切换 AI 模型

在文章编辑器界面，你可以通过 AI 助手右上角的下拉菜单在不同模型之间切换：
- 本地模型
- Ollama
- DeepSeek
- Kimi（如果API开放）

### 5.5 安全和隐私注意事项

- **云端模型**：所有发送到 AI 提供商的文档内容都通过 TLS 1.3 进行传输加密
- **本地模型**：数据完全保留在本地设备，不经过网络传输
- **隐私模式**：启用隐私模式以最小化数据保留
- **环境变量**：API 密钥存储在环境变量中，不会提交到代码仓库

### 5.6 测试 AI 配置

设置完成后，启动应用程序：

1. 启动应用：`npm run dev`
2. 打开文章编辑器
3. 点击右下角的 AI 助手图标
4. 尝试测试查询，如："将以下样本文本转换为AKN4UN XML格式：样本法律文档内容"
5. 验证是否收到正确的XML响应

### 5.7 故障排除

- **API 密钥错误**：检查环境变量配置是否正确，确保密钥格式正确
- **Ollama 连接问题**：确保 Ollama 服务正在运行 (`ollama serve`)
- **模型未找到**：确认所需模型已下载 (`ollama list`)
- **速率限制**：如果使用云端模型遇到限制，可切换到本地模型
- **响应质量**：调整温度设置或尝试不同模型