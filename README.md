# Vue 3 + Vite 博客系统

这是一个基于 Vue 3、Vite、Element Plus 和 Pinia 构建的博客系统。该项目也搭载了一个简单的展示个人简历的入口，用户可以在博客系统中查看和下载简历，同时还集成了一个基于AI（调用DeepSeek API和Ollama本地部署大模型）的智能问答功能，用来处理AKN4UN XML格式的文档，该模块被集成到了写文章的页面当中，需要用户登录才能使用，拉取该项目之后需要你自己在config->aiConfig文件当中部署自己的DeepSeek API密钥或者Ollama本地部署大模型的URL。

本项目支持三种不同的数据获取方式，可根据不同使用场景灵活选择：
本地开发环境：
1. 优先使用Set-Location "D:\Code\JS\my-blog\backend"; python -m uvicorn main:app  --host 0.0.0.0 --port 8001启动后端服务。然后在浏览器中访问http://localhost:8001，即可查看API文档。在另外一个终端运行npm run dev启动前端服务，更改之后使用npm run build打包前端代码，最后上传到GitHub仓库，GitHub Actions会自动部署到GitHub Pages上。前端会根据环境变量自动切换API端点，在本地开发环境下会使用http://localhost:8001作为API端点，在GitHub Pages环境下会使用./api作为API端点。 

2. 再次使用json-server --watch db.json --port 3000命令启动json-server服务，前端会自动切换到http://localhost:3000作为API端点，数据来自db.json文件中的模拟数据，但是该数据仅仅是存于内存中的，不会持久化到数据库中，然后使用npm run dev启动前端服务，适合前端开发和功能测试。最后使用npm run build打包前端代码，上传到GitHub仓库，GitHub Actions会自动部署到GitHub Pages上。前端会根据环境变量自动切换API端点，在本地开发环境下会使用http://localhost:3000作为API端点，在GitHub Pages环境下会使用./api作为API端点。
   
3. 最后是可以在Github Pages上直接使用静态JSON文件作为数据源的方式，前端会自动切换到./api作为API端点，数据来自public/api/*.json静态文件，但是由于GitHub Pages环境的限制，所有数据都是静态的，无法进行任何数据修改操作，用户登录、文章发布、与AI交互等动态功能都无法使用。

## 三种数据获取方式

### 1. MySQL + FastAPI 后端服务方式

此方式适用于完整功能开发和生产环境使用，具有完整的数据持久化能力。

#### 配置步骤：
1. **安装并配置MySQL数据库**
   - 下载并安装MySQL服务
   - 创建数据库：`CREATE DATABASE blog_db;`
   - 确保MySQL服务正在运行

2. **配置数据库连接**
   - 在 `backend/database.py` 中设置数据库连接参数
   - 推荐使用环境变量设置敏感信息：
     ```bash
     # 设置环境变量（Linux/Mac）
     export DB_USER=your_username
     export DB_PASSWORD=your_password
     export DB_HOST=localhost
     export DB_PORT=3306
     export DB_NAME=blog_db
     ```
     
     ```cmd
     # 设置环境变量（Windows）
     set DB_USER=your_username
     set DB_PASSWORD=your_password
     set DB_HOST=localhost
     set DB_PORT=3306
     set DB_NAME=blog_db
     ```

3. **安装Python依赖**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

4. **启动后端服务**
   ```bash
   # Windows
   Set-Location "d:\Code\JS\my-blog\backend"; python -m uvicorn main:app --host 0.0.0.0 --port 8001
   
   # 或使用启动脚本
   cd backend
   .\start_server.bat

   # 然后可以在浏览器中访问 http://localhost:8001 查看API文档
   ```

5. **启动前端服务**
   ```bash
   npm run dev
   ```

6. **前端配置**
   - 前端会自动检测环境并使用 `http://localhost:8001` 作为API端点
   - 所有数据操作将通过FastAPI接口与MySQL数据库交互

#### 特点：
- 完整的CRUD功能
- 用户认证和授权
- 实时数据同步
- 支持所有业务功能（文章发布、评论、点赞等）

### 2. Json-server Mock数据方式

此方式适用于前端开发和功能测试，无需配置数据库，使用模拟数据。

#### 配置步骤：
1. **安装json-server**
   ```bash
   npm install -g json-server
   ```

2. **启动json-server服务**
   ```bash
   # 在项目根目录下启动
   json-server --watch db.json --port 3000
   ```

3. **启动前端开发服务器**
   ```bash
   npm run dev
   ```

4. **前端配置**
   - 前端会自动检测环境并使用 `http://localhost:3000` 作为API端点
   - 数据来自 `db.json` 文件中的模拟数据

#### 特点：
- 快速启动，无需数据库配置
- 适合前端界面开发
- 支持数据的增删改查（临时存储在内存中）
- 部分高级功能可能受限

### 3. GitHub Pages 静态数据方式

此方式适用于部署到GitHub Pages，使用静态JSON文件提供数据，但部分动态功能受限。

#### 部署步骤：
1. **构建项目**
   ```bash
   npm run build
   ```

2. **部署到GitHub Pages**
   - 方式1（推荐）：使用GitHub Actions
     - 确保仓库名为 `yourusername.github.io` 或者 `your-repo-name`
     - 将代码推送到 `master` 分支
     - GitHub Actions 会在 `.github/workflows/deploy.yml` 中自动构建并部署
   
   - 方式2：手动部署
     - 将 `dist` 目录中的内容部署到 GitHub Pages

3. **数据获取方式**
   - 前端会自动检测为GitHub Pages环境，使用 `./api` 作为API端点
   - 所有数据从 `public/api/*.json` 静态文件获取

#### 在线演示
你可以查看项目的[在线演示](https://yiyidecat.github.io/My-blog/)，但请注意：
- 由于没有上传DeepSeek API密钥，智能问答功能会报错
- 网站只能展示静态资源，发布文章、与AI交互、用户登录等动态功能无法使用
- 所有数据显示为静态内容，无法进行任何数据修改操作

#### 特点：
- 无需后端服务
- 免费托管
- 适合展示和分享
- **限制**：不支持数据修改、用户认证、实时交互等动态功能

## 本地开发

！！！！！！！！注意：
1. 运行项目前请先启动后端API服务：
Set-Location "d:\Code\JS\my-blog\backend"; python -m uvicorn main:app --host 0.0.0.0 --port 8001
2. 或者如果你想使用mock数据测试前端功能，可以在项目根目录下运行
json-server --watch db.json --port 3000。
3. 启动前端开发服务器：
npm run dev

### 1. 安装依赖
```bash
npm install -g json-server
npm install
```

### 2. 启动后端API服务
```bash
# 方法1：启用Mysql数据库并启动FastAPI服务
先在backend目录下的database.py文件当中配置好你的MySQL数据库连接参数，然后运行以下命令：

Set-Location "d:\Code\JS\my-blog\backend"; python -m uvicorn main:app --host 0.0.0.0 --port 8001

# 方法2：手动启动json-server服务
json-server --watch db.json --port 3000
```

### 3. 启动前端开发服务器
```bash
npm run dev
```

### 4. 用户登录
可以使用以下测试账号登录（仅在MySQL+FastAPI模式下有效）：
- 用户名：`前端小白`  
- 密码：`frontend123`

- 用户名：`后端老手  `  
- 密码：`backend123`   

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

## 3. 文章详情
- **API**: `GET /posts/:id`
- **需求**:
  - 显示文章内容（富文本渲染）
  - 评论区：输入框 + 发表按钮
  - 发表评论：调用 `POST /posts/:id/comments`，添加到评论列表

## 4. 技术亮点
- ✨ **虚拟滚动**：文章列表用 `el-virtual-list`（Element Plus组件）
- ✨ **评论防抖**：发表评论时防抖处理（避免重复请求）
- ✨ **状态管理**：用Pinia统一管理用户登录态和文章数据
- ✨ **API封装**：统一请求拦截器，处理错误和token过期 
- ✨ **路由守卫**：登录后才能访问文章详情页
- ✨ **评论列表**：实时更新，支持删除评论
- 

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