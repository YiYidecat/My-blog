"""
数据库CRUD操作文件
用途: 定义对数据库的增删改查操作函数
功能: 包含Post、User、Category、Comment等实体的创建、读取、更新、删除操作
"""

from sqlalchemy.orm import Session
from sqlalchemy import and_
from models import Post, User, Category, Comment
from schemas import PostCreate, PostUpdate, UserCreate, CategoryCreate, CommentCreate
import json
from datetime import date

def get_posts(db: Session, skip: int = 0, limit: int = 100):
    posts = db.query(Post).offset(skip).limit(limit).all()
    # 转换JSON字段
    for post in posts:
        if isinstance(post.tags, str):
            post.tags = json.loads(post.tags)
    return posts

def get_post_by_id(db: Session, post_id: str):
    post = db.query(Post).filter(Post.id == post_id).first()
    if post and isinstance(post.tags, str):
        post.tags = json.loads(post.tags)
    return post

def create_post(db: Session, post: PostCreate):
    # 处理tags列表
    tags_json = json.dumps(post.tags) if post.tags else "[]"
    db_post = Post(
        id=post.id if hasattr(post, 'id') else None,
        title=post.title,
        content=post.content,
        xmlContent=post.xmlContent,
        category=post.category,
        tags=tags_json,
        author=post.author,
        publishDate=post.publishDate,
        likes=post.likes,
        views=post.views,
        commentsCount=post.commentsCount
    )
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    
    if isinstance(db_post.tags, str):
        db_post.tags = json.loads(db_post.tags)
    return db_post

def update_post(db: Session, post_id: str, post_update: PostUpdate):
    db_post = db.query(Post).filter(Post.id == post_id).first()
    if not db_post:
        return None
    
    update_data = post_update.dict(exclude_unset=True)
    if "tags" in update_data and update_data["tags"]:
        update_data["tags"] = json.dumps(update_data["tags"])
    
    for key, value in update_data.items():
        setattr(db_post, key, value)
    
    db.commit()
    db.refresh(db_post)
    
    if isinstance(db_post.tags, str):
        db_post.tags = json.loads(db_post.tags)
    return db_post

def delete_post(db: Session, post_id: str):
    db_post = db.query(Post).filter(Post.id == post_id).first()
    if not db_post:
        return False
    
    db.delete(db_post)
    db.commit()
    return True

def increment_post_likes(db: Session, post_id: str):
    db_post = db.query(Post).filter(Post.id == post_id).first()
    if not db_post:
        return None
    
    db_post.likes += 1
    db.commit()
    db.refresh(db_post)
    
    if isinstance(db_post.tags, str):
        db_post.tags = json.loads(db_post.tags)
    return db_post

def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(User).offset(skip).limit(limit).all()

def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

def get_user_by_username(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()

def authenticate_user(db: Session, username: str, password: str):
    from passlib.context import CryptContext
    
    # 获取用户
    user = db.query(User).filter(User.username == username).first()
    if not user:
        return None
    
    # 验证密码
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    if not pwd_context.verify(password, user.hashed_password):
        return None
    
    return user

def create_user(db: Session, user: UserCreate):
    from passlib.context import CryptContext
    
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    hashed_password = pwd_context.hash(user.password)
    
    db_user = User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_categories(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Category).offset(skip).limit(limit).all()

def get_category_by_id(db: Session, category_id: int):
    return db.query(Category).filter(Category.id == category_id).first()

def create_category(db: Session, category: CategoryCreate):
    db_category = Category(
        name=category.name,
        count=category.count
    )
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category

def get_comments(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Comment).offset(skip).limit(limit).all()

def get_comment_by_id(db: Session, comment_id: int):
    return db.query(Comment).filter(Comment.id == comment_id).first()

def get_comments_by_post_id(db: Session, post_id: str):
    return db.query(Comment).filter(Comment.postId == post_id).all()

def create_comment(db: Session, comment: CommentCreate):
    db_comment = Comment(
        postId=comment.postId,
        author=comment.author,
        content=comment.content,
        date=comment.date,
        authorAvatar=comment.authorAvatar
    )
    db.add(db_comment)
    db.commit()
    db.refresh(db_comment)
    return db_comment