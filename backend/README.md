# FastAPI后端服务 - 博客系统API接口

## 项目概述

本项目使用FastAPI框架构建了完整的博客系统后端服务，采用MySQL作为数据库存储，提供RESTful API接口供前端调用。系统已完成从json-server到MySQL的数据迁移。

## 数据库结构

数据库名称: `blog_db`

### 表结构详解

**posts** - 文章表
- id (String, 主键) - 文章唯一标识符
- title (String) - 文章标题
- content (Text) - 文章正文内容
- xmlContent (Text, 可选) - XML格式内容
- category (String) - 文章分类
- tags (JSON) - 标签数组
- author (String) - 作者
- publishDate (Date) - 发布日期
- likes (Integer, 默认0) - 点赞数
- views (Integer, 默认0) - 浏览量
- commentsCount (Integer, 默认0) - 评论数
- updatedAt (DateTime) - 最后更新时间

**users** - 用户表
- id (Integer, 主键，自增) - 用户唯一标识符
- username (String, 唯一) - 用户名
- email (String, 唯一) - 邮箱
- hashed_password (String) - 加密密码
- bio (Text, 默认'') - 个人简介
- avatar (Text, 默认'') - 头像链接
- postsCount (Integer, 默认0) - 发布文章数
- followersCount (Integer, 默认0) - 关注者数量
- followingCount (Integer, 默认0) - 关注人数
- createdAt (DateTime, 可选) - 注册时间
- is_active (Boolean, 默认True) - 是否激活
- created_at (DateTime) - 账户创建时间

**categories** - 分类表
- id (Integer, 主键，自增) - 分类唯一标识符
- name (String, 唯一) - 分类名称
- count (Integer, 默认0) - 该分类下的文章数量

**comments** - 评论表
- id (Integer, 主键，自增) - 评论唯一标识符
- postId (String, 可选) - 关联的文章ID
- author (String) - 评论作者
- content (Text) - 评论内容
- date (String, 可选) - 评论日期
- authorAvatar (Text, 可选) - 评论者头像
- created_at (DateTime) - 评论创建时间

## 后端项目结构

```
backend/
├── main.py              # FastAPI主应用程序文件，定义所有API路由和端点
├── models.py            # 数据库模型定义文件，定义ORM模型类
├── schemas.py           # Pydantic数据模型定义文件，定义API请求响应模型
├── crud.py              # 数据库CRUD操作文件，包含创建、读取、更新、删除操作
├── database.py          # 数据库连接配置文件，配置MySQL连接参数
├── requirements.txt     # Python依赖包列表
├── start_server.bat     # Windows启动脚本，快速启动FastAPI服务
└── README.md           # 本文件，后端服务使用指南
```

### 各脚本文件功能说明

- **main.py**: FastAPI主应用程序文件
  - 用途: 定义所有的API路由和端点，配置CORS中间件
  - 功能: 提供博客系统的REST API接口，包括文章、用户、分类、评论的管理功能
  - 特色: 包含API文档端点、CORS配置、完整的CRUD路由

- **models.py**: 数据库模型定义文件
  - 用途: 定义ORM模型类，映射到MySQL数据库中的表结构
  - 功能: 包含Post、User、Category、Comment等实体的数据库表结构定义
  - 特色: 使用SQLAlchemy ORM，支持关系映射和数据类型定义

- **schemas.py**: Pydantic数据模型定义文件
  - 用途: 定义API请求和响应的数据验证模型
  - 功能: 包含Post、User、Category、Comment等实体的输入输出数据结构定义
  - 特色: 自动数据验证、类型检查、序列化和反序列化

- **crud.py**: 数据库CRUD操作文件
  - 用途: 定义对数据库的增删改查操作函数
  - 功能: 包含Post、User、Category、Comment等实体的创建、读取、更新、删除操作
  - 特色: 事务管理、数据验证、错误处理

- **database.py**: 数据库连接配置文件
  - 用途: 配置与MySQL数据库的连接，创建SQLAlchemy引擎和会话
  - 功能: 定义数据库连接参数、引擎、会话工厂和声明基类
  - 特色: 支持连接池、事务管理

## 如何运行项目

### 1. 安装依赖
```bash
pip install -r requirements.txt
```

### 2. 配置数据库
在 `database.py` 中配置MySQL连接参数，建议使用环境变量：

```python
import os
from urllib.parse import quote_plus

# 从环境变量获取数据库凭据
DB_USER = os.getenv('DB_USER', 'root')
DB_PASSWORD = os.getenv('DB_PASSWORD', 'your_password')
DB_HOST = os.getenv('DB_HOST', 'localhost')
DB_PORT = os.getenv('DB_PORT', '3306')
DB_NAME = os.getenv('DB_NAME', 'blog_db')

# 对密码进行URL编码以处理特殊字符
encoded_password = quote_plus(DB_PASSWORD)
DATABASE_URL = f"mysql+pymysql://{DB_USER}:{encoded_password}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
```

### 3. 启动后端服务
```bash
cd backend
python -m uvicorn main:app --reload --port 8000
```

或者使用Windows批处理脚本：
```bash
start_server.bat
```

### 4. 查看API文档
启动后端后，访问 `http://localhost:8000/docs` 查看交互式API文档

## API端点

### 文章管理
- `GET /posts` - 获取所有文章（支持分页）
- `GET /posts/{post_id}` - 根据ID获取文章
- `POST /posts` - 创建文章
- `PUT /posts/{post_id}` - 更新文章
- `DELETE /posts/{post_id}` - 删除文章
- `PATCH /posts/{post_id}` - 更新文章特定字段（如点赞）

### 用户管理
- `GET /users` - 获取所有用户（支持按用户名查询）
- `GET /users/{user_id}` - 根据ID获取用户
- `POST /users` - 创建用户
- `POST /users/authenticate` - 用户身份验证

### 分类管理
- `GET /categories` - 获取所有分类
- `GET /categories/{category_id}` - 根据ID获取分类
- `POST /categories` - 创建分类

### 评论管理
- `GET /comments` - 获取所有评论（支持按文章ID查询）
- `GET /comments/{comment_id}` - 根据ID获取评论
- `POST /comments` - 创建评论

## 环境变量配置

为了安全起见，建议使用环境变量存储敏感信息。系统会自动从项目根目录的 `.env.local` 文件中加载环境变量。

### 1. 创建环境变量文件

在项目根目录（`d:\Code\JS\my-blog\`）创建 `.env.local` 文件，内容如下：

```
DB_USER=your_username
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=3306
DB_NAME=blog_db
```

### 2. 配置说明

- `.env.local` 文件会被 Git 忽略，确保敏感信息不会提交到代码仓库
- 系统会自动加载 `.env.local` 文件中的环境变量
- 如果环境变量未设置，将使用 `database.py` 中定义的默认值

### 3. 环境变量优先级

环境变量加载顺序（优先级从高到低）：
1. 系统环境变量（运行时设置的环境变量）
2. `.env.local` 文件中的变量
3. `database.py` 中定义的默认值

## 故障排除

### 数据库连接错误
如果出现数据库连接错误，请确认：
1. MySQL服务正在运行
2. 数据库`blog_db`已存在
3. 用户名和密码正确
4. 环境变量配置正确（如果使用）

### CORS错误
如果遇到CORS错误，请确认后端服务正在运行，并且前端请求的端口与CORS配置匹配。

### API调用错误
查看FastAPI自动生成的API文档 `http://localhost:8000/docs` 以确认正确的API调用方式。