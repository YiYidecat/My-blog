"""
数据库连接配置文件
用途: 配置与MySQL数据库的连接，创建SQLAlchemy引擎和会话
功能: 定义数据库连接参数、引擎、会话工厂和声明基类
"""
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# 数据库连接配置（请根据你的MySQL配置修改）
DATABASE_URL = "mysql+pymysql://root:your_password@localhost:3306/blog_db"

#创建SQLAlchemy引擎
engine = create_engine(DATABASE_URL)

# 创建会话工厂
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 声明基类
Base = declarative_base()