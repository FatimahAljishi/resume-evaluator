from passlib.context import CryptContext #type: ignore
from jose import jwt #type: ignore
from datetime import datetime, timedelta
from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from fastapi import HTTPException, status
from sqlmodel import Session, select #type: ignore
from app.models import User
from app.database import get_session

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)

SECRET_KEY = "change-this-in-production"
ALGORITHM = "HS256"

def create_access_token(email: str) -> str:
    payload = {
        "sub": email,
        "exp": datetime.utcnow() + timedelta(hours=1)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

def decode_token(token: str) -> str:
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    return payload["sub"]

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

def get_current_user(token: str = Depends(oauth2_scheme)) -> str:
    email = decode_token(token)  
    return email

def require_admin(
    current_user_email: str = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    user = session.exec(select(User).where(User.email == current_user_email)).first()
    if not user or user.role != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="403 Forbidden: Admin access required")
    return user