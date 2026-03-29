"""
Pydantic数据模型定义文件
用途: 定义API请求和响应的数据验证模型
功能: 包含Post、User、Category、Comment等实体的输入输出数据结构定义
"""

from pydantic import BaseModel
from typing import List, Optional
from datetime import date
from datetime import datetime

class PostBase(BaseModel):
    title: str
    content: str
    xmlContent: Optional[str] = None
    category: str
    tags: List[str]
    author: str
    publishDate: date
    likes: int = 0
    views: int = 0
    commentsCount: int = 0

class PostCreate(PostBase):
    id: Optional[str] = None

class PostUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    xmlContent: Optional[str] = None
    category: Optional[str] = None
    tags: Optional[List[str]] = None
    author: Optional[str] = None
    publishDate: Optional[date] = None
    likes: Optional[int] = None
    views: Optional[int] = None
    commentsCount: Optional[int] = None

class Post(PostBase):
    id: str
    
    class Config:
        from_attributes = True

class UserBase(BaseModel):
    username: str
    email: str

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    bio: Optional[str] = None
    avatar: Optional[str] = None
    postsCount: Optional[int] = None
    followersCount: Optional[int] = None
    followingCount: Optional[int] = None
    createdAt: Optional[datetime] = None

class User(UserBase):
    id: int
    bio: Optional[str] = None
    avatar: Optional[str] = None
    postsCount: int = 0
    followersCount: int = 0
    followingCount: int = 0
    createdAt: Optional[datetime] = None
    is_active: bool
    
    class Config:
        from_attributes = True

class CategoryBase(BaseModel):
    name: str
    count: int = 0

class CategoryCreate(CategoryBase):
    pass

class CategoryCountUpdate(BaseModel):
    count: int

class Category(CategoryBase):
    id: int
    
    class Config:
        from_attributes = True

class CommentBase(BaseModel):
    content: str
    postId: Optional[str] = None  # 允许为空以匹配db.json
    author: str
    date: Optional[str] = None  # 匹配db.json中的date字段
    authorAvatar: Optional[str] = None  # 匹配db.json中的authorAvatar字段

class CommentCreate(CommentBase):
    pass

class Comment(CommentBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True
        populate_by_name = True  # 允许使用别名