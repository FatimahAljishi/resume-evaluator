from fastapi import APIRouter, status, HTTPException
from app.schemas import (
    RegisterRequest,
    LoginRequest,
    UserResponse,
    TokenResponse,
)


router = APIRouter()

users ={}

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register(request: RegisterRequest):
    if request.email in users:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
    users[request.email] = request.password
    return UserResponse(email=request.email, role="user")

@router.post("/login", response_model=TokenResponse)
def login(request: LoginRequest):
    return TokenResponse(access_token="fake-jwt-token", token_type="bearer")