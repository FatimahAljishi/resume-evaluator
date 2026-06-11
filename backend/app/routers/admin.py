from fastapi import APIRouter, status, HTTPException
from fastapi import Depends
from sqlmodel import Session, select #type: ignore
from app.database import get_session
from app.models import User
from app.auth_utils import require_admin
from app.schemas import UpdateRoleRequest

admin_router = APIRouter()

@admin_router.get("/users")
def list_users(session: Session = Depends(get_session), admin_user: User = Depends(require_admin)):
    users = session.exec(select(User)).all()
    return users

@admin_router.patch("/users/{email}/role")
def update_user_role(email: str, request: UpdateRoleRequest, session: Session = Depends(get_session), admin_user: User = Depends(require_admin)):
    user = session.exec(select(User).where(User.email == email)).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    user.role = request.role
    session.add(user)
    session.commit()
    session.refresh(user)
    return user

@admin_router.delete("/users/{email}")
def delete_user(email: str, session: Session = Depends(get_session), admin_user: User = Depends(require_admin)):
    user = session.exec(select(User).where(User.email == email)).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    session.delete(user)
    session.commit()
    return {
        "message": f"User {email} deleted"
    }