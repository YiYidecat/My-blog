"""
数据库模型定义文件
用途: 定义ORM模型类，映射到MySQL数据库中的表结构
功能: 包含Post、User、Category、Comment等实体的数据库表结构定义
"""

from sqlalchemy import Column, Integer, String, Text, DateTime, Date, JSON, Boolean, ForeignKey
from sqlalchemy.sql import func
from database import Base

class Post(Base):
    __tablename__ = "posts"

    id = Column(String(36), primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)
    xmlContent = Column(Text, nullable=True)
    category = Column(String(100), nullable=False)
    tags = Column(JSON, nullable=True)  # 存储为JSON数组
    author = Column(String(100), nullable=False)
    publishDate = Column(Date, nullable=False)
    likes = Column(Integer, default=0)
    views = Column(Integer, default=0)
    commentsCount = Column(Integer, default=0)
    updatedAt = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True, nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    bio = Column(Text, default='')
    avatar = Column(Text, default='')
    postsCount = Column(Integer, default=0)
    followersCount = Column(Integer, default=0)
    followingCount = Column(Integer, default=0)
    createdAt = Column(DateTime, default=None)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, index=True, nullable=False)
    count = Column(Integer, default=0)  # 匹配db.json中的count字段

class Comment(Base):
    __tablename__ = "comments"

    id = Column(Integer, primary_key=True, index=True)
    postId = Column(String(36), nullable=True)  # 对应Post.id，允许为空以匹配db.json
    author = Column(String(100), nullable=False)
    content = Column(Text, nullable=False)
    date = Column(String(20), nullable=True)  # 匹配db.json中的date字段
    authorAvatar = Column(Text, nullable=True)  # 匹配db.json中的authorAvatar字段
    created_at = Column(DateTime(timezone=True), server_default=func.now())