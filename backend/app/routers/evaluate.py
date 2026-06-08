from fastapi import APIRouter
from app.schemas import EvaluateRequest, EvaluateResponse
from app.auth_utils import get_current_user
from fastapi import Depends

evaluate_router = APIRouter()

@evaluate_router.post("/evaluate")
def evaluate_resume(request: EvaluateRequest, current_user: str = Depends(get_current_user)):
    return EvaluateResponse(result = f'Evaluation requested by {current_user}. ChatGPT integration coming in Stage 5.')    