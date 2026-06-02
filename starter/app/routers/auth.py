from fastapi import APIRouter
from app.schemas import (
    RegisterRequest,
    LoginRequest,
    UserResponse,
    TokenResponse,
)

router = APIRouter()

@router.post("/register", response_model=UserResponse)
def register(request: RegisterRequest):
    return UserResponse(email=request.email, role="user")

@router.post("/login", response_model=TokenResponse)
def login(request: LoginRequest):
    return TokenResponse(access_token="fake-jwt-token", token_type="bearer")