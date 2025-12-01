import os
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

RDS_USER = "admin"
RDS_PASSWORD = "EasyFundDB123!"
RDS_HOST = "easyfund-db.c10gmuokacda.us-east-1.rds.amazonaws.com"
RDS_DB = "investment"

DATABASE_URL = f"mysql+pymysql://{RDS_USER}:{RDS_PASSWORD}@{RDS_HOST}:3306/{RDS_DB}"

engine = create_engine(
    DATABASE_URL,
    echo=False,
    pool_pre_ping=True,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
