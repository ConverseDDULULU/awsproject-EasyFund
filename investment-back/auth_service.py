import os
from datetime import datetime, timedelta
from typing import Dict, Optional

import bcrypt
from jose import jwt
from sqlalchemy import Column, DateTime, Integer, String, func
from sqlalchemy.orm import Session

from database import Base, engine


JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "change-me")
JWT_ALGORITHM = "HS256"
JWT_EXPIRE_MINUTES = int(os.getenv("JWT_EXPIRE_MINUTES", "60"))


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    name = Column(String(255), nullable=False)
    password = Column(String(255), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


Base.metadata.create_all(bind=engine)


def _hash_password(password: str) -> str:
    hashed = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
    return hashed.decode("utf-8")


def _verify_password(password: str, password_hash: str) -> bool:
    try:
        return bcrypt.checkpw(password.encode("utf-8"), password_hash.encode("utf-8"))
    except ValueError:
        return False


def _create_access_token(email: str, name: str) -> str:
    expire = datetime.utcnow() + timedelta(minutes=JWT_EXPIRE_MINUTES)
    payload = {"sub": email, "name": name, "exp": expire}
    return jwt.encode(payload, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)


def signup(email: str, password: str, name: str, db: Session) -> Dict[str, str]:
    existing_user = db.query(User).filter(User.email == email).first()
    if existing_user:
        return {"error": "Email already registered."}

    user = User(email=email, name=name, password=_hash_password(password))
    db.add(user)
    db.commit()
    db.refresh(user)

    token = _create_access_token(user.email, user.name)
    return {"token": token, "email": user.email, "name": user.name}


def login(email: str, password: str, db: Session) -> Dict[str, str]:
    user = db.query(User).filter(User.email == email).first()
    if not user:
        return {"error": "Account not found."}
    if not _verify_password(password, user.password):
        return {"error": "Invalid credentials."}

    token = _create_access_token(user.email, user.name)
    return {"token": token, "email": user.email, "name": user.name}


def get_profile(email: str, db: Session) -> Optional[Dict[str, str]]:
    user = db.query(User).filter(User.email == email).first()
    if not user:
        return None
    return {"email": user.email, "name": user.name}
