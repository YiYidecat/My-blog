"""
FastAPI主应用程序文件
用途: 定义所有的API路由和端点，配置CORS中间件
功能: 提供博客系统的REST API接口，包括文章、用户、分类、评论的管理功能
"""

from fastapi import FastAPI, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
import json
from datetime import date
import uuid

from fastapi.middleware.cors import CORSMiddleware

from database import SessionLocal, engine
from models import Base
from schemas import Post, PostCreate, PostUpdate, User, UserCreate, Category, CategoryCreate, CategoryCountUpdate, Comment, CommentCreate
from crud import (
    get_posts, get_post_by_id, create_post, update_post, delete_post, increment_post_likes,
    get_users, get_user_by_id, get_user_by_username, create_user, authenticate_user,
    get_categories, get_category_by_id, create_category, update_category_count,
    get_comments, get_comment_by_id, get_comments_by_post_id, create_comment
)

# 创建数据库表
Base.metadata.create_all(bind=engine)

# 创建FastAPI应用实例，自动生成API文档并提供交互式界面
app = FastAPI(title="Blog API", version="1.0.0")

# 添加CORS中间件
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 在生产环境中应该限制为具体的域名
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    # 明确添加暴露的头部
    expose_headers=["Access-Control-Allow-Origin"]
)

# 数据库依赖
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "Blog API is running!"}

# Posts API
@app.get("/posts", response_model=List[Post])
def read_posts(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    posts = get_posts(db, skip=skip, limit=limit)
    # 处理tags字段，确保返回正确的格式
    for post in posts:
        if isinstance(post.tags, str):
            post.tags = json.loads(post.tags)
    return posts

@app.get("/posts/{post_id}", response_model=Post)
def read_post(post_id: str, db: Session = Depends(get_db)):
    post = get_post_by_id(db, post_id)
    if post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    if isinstance(post.tags, str):
        post.tags = json.loads(post.tags)
    return post

@app.post("/posts", response_model=Post)
def create_new_post(post: PostCreate, db: Session = Depends(get_db)):
    # 如果没有提供ID，则生成一个UUID
    if not post.id:
        post_id = str(uuid.uuid4())
    else:
        post_id = post.id
        
    # 为新文章设置默认值
    post_dict = post.model_dump()
    post_dict['id'] = post_id
    if not post_dict.get('publishDate'):
        from datetime import date
        post_dict['publishDate'] = date.today()
        
    # 重新创建PostCreate实例
    new_post = PostCreate(**post_dict)
    return create_post(db, new_post)

@app.put("/posts/{post_id}", response_model=Post)
def update_existing_post(post_id: str, post_update: PostUpdate, db: Session = Depends(get_db)):
    updated_post = update_post(db, post_id, post_update)
    if updated_post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    if isinstance(updated_post.tags, str):
        updated_post.tags = json.loads(updated_post.tags)
    return updated_post

@app.delete("/posts/{post_id}")
def delete_existing_post(post_id: str, db: Session = Depends(get_db)):
    success = delete_post(db, post_id)
    if not success:
        raise HTTPException(status_code=404, detail="Post not found")
    return {"message": "Post deleted successfully"}

@app.patch("/posts/{post_id}")
def patch_post(post_id: str, field: str = Query(...), value: str = Query(...), db: Session = Depends(get_db)):
    if field == "likes":
        updated_post = increment_post_likes(db, post_id)
        if updated_post is None:
            raise HTTPException(status_code=404, detail="Post not found")
        if isinstance(updated_post.tags, str):
            updated_post.tags = json.loads(updated_post.tags)
        return updated_post
    else:
        raise HTTPException(status_code=400, detail="Only likes field can be patched for now")

# Users API
@app.get("/users", response_model=List[User])
def read_users(skip: int = 0, limit: int = 100, username: str = Query(None), db: Session = Depends(get_db)):
    if username:
        user = get_user_by_username(db, username)
        if user is None:
            raise HTTPException(status_code=404, detail="User not found")
        return [user]
    else:
        return get_users(db, skip=skip, limit=limit)

@app.get("/users/{user_id}", response_model=User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    user = get_user_by_id(db, user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@app.post("/users", response_model=User)
def create_new_user(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = get_user_by_username(db, user.username)
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    return create_user(db, user)

from pydantic import BaseModel

class LoginRequest(BaseModel):
    username: str
    password: str

@app.post("/users/authenticate")
def authenticate_user_endpoint(request: LoginRequest, db: Session = Depends(get_db)):
    username = request.username
    password = request.password
    
    if not username or not password:
        raise HTTPException(status_code=400, detail="Username and password are required")
    
    user = authenticate_user(db, username, password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid username or password")
    
    # 返回用户信息
    return {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "bio": user.bio,
        "avatar": user.avatar,
        "postsCount": user.postsCount,
        "followersCount": user.followersCount,
        "followingCount": user.followingCount,
        "createdAt": user.createdAt,
        "is_active": user.is_active
    }

# Categories API
@app.get("/categories", response_model=List[Category])
def read_categories(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return get_categories(db, skip=skip, limit=limit)

@app.get("/categories/{category_id}", response_model=Category)
def read_category(category_id: int, db: Session = Depends(get_db)):
    category = get_category_by_id(db, category_id)
    if category is None:
        raise HTTPException(status_code=404, detail="Category not found")
    return category

@app.post("/categories", response_model=Category)
def create_new_category(category: CategoryCreate, db: Session = Depends(get_db)):
    return create_category(db, category)

@app.patch("/categories/{category_id}/count", response_model=Category)
def patch_category_count(category_id: int, body: CategoryCountUpdate, db: Session = Depends(get_db)):
    updated_category = update_category_count(db, category_id, body.count)
    if updated_category is None:
        raise HTTPException(status_code=404, detail="Category not found")

    return updated_category

# Comments API
@app.get("/comments", response_model=List[Comment])
def read_comments(skip: int = 0, limit: int = 100, post_id: str = Query(None), db: Session = Depends(get_db)):
    if post_id:
        return get_comments_by_post_id(db, post_id)
    return get_comments(db, skip=skip, limit=limit)

@app.get("/comments/{comment_id}", response_model=Comment)
def read_comment(comment_id: int, db: Session = Depends(get_db)):
    comment = get_comment_by_id(db, comment_id)
    if comment is None:
        raise HTTPException(status_code=404, detail="Comment not found")
    return comment

@app.post("/comments", response_model=Comment)
def create_new_comment(comment: CommentCreate, db: Session = Depends(get_db)):
    return create_comment(db, comment)