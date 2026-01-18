# Vue 3 + Vite

-----------------------------------------------------------------------------------------------------
## 后端数据接口
# 1. 安装依赖
npm install -g json-server

# 2. 创建 db.json 文件（内容见下方）
touch db.json

# 3. 复制以下内容到 db.json
{
  "posts": [
    {
      "id": 1,
      "title": "Vue3响应式原理深度解析",
      "content": "Vue3使用Proxy替代Object.defineProperty...",
      "category": "前端",
      "author": "张三",
      "likes": 15,
      "comments": [
        { "id": 101, "content": "讲得透彻！" },
        { "id": 102, "content": "需要源码链接" }
      ]
    }
  ],
  "users": [
    { "id": 1, "username": "user1", "password": "123456", "avatar": "https://example.com/avatar1.jpg" }
  ],
  "comments": []
}

# 4. 启动API服务
json-server --watch db.json --port 3001

-----------------------------------------------------------------------------------------------------
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

-----------------------------------------------------------------------------------------------------
## 业务逻辑
# 墨语博客开发指南

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