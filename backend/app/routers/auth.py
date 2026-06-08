from fastapi import APIRouter, status, HTTPException
from app.schemas import (
    RegisterRequest,
    LoginRequest,
    UserResponse,
    TokenResponse,
)
from app import store
from app.auth_utils import (
    hash_password,
    verify_password,
    create_access_token,
    get_current_user,
)
from fastapi import Depends


router = APIRouter()


@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register(request: RegisterRequest):
    if request.email in store.users:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
    hashed_password = hash_password(request.password)
    store.users[request.email] = {
        "email": request.email,
        "hashed_password": hashed_password,
        "role": "user",
    }
    return UserResponse(email=request.email, role="user")

@router.post("/login", response_model=TokenResponse)
def login(request: LoginRequest):
    user = store.users.get(request.email)

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )
    if not verify_password(request.password, store.users[request.email]["hashed_password"]):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid credentials")
    access_token = create_access_token(request.email)
    return TokenResponse(access_token=access_token, token_type="bearer")

@router.get("/me", response_model=UserResponse)
def read_current_user(current_user: str = Depends(get_current_user)):
    user_data = store.users.get(current_user)
    if not user_data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return UserResponse(email=user_data["email"], role=user_data["role"])