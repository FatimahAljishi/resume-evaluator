from fastapi import FastAPI
from app.routers.auth import router 
from app.routers.evaluate import evaluate_router
from fastapi.middleware.cors import CORSMiddleware
from app.database import create_db

app = FastAPI(title="Resume Evaluator API")

app.include_router(router, prefix="/auth")
app.include_router(evaluate_router, prefix="/evaluate")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    create_db()

@app.get("/")
def root():
    return {"message": "Hello from FastAPI!"}

@app.get("/ping")
def ping():
    return {"status": "ok"}

@app.get("/hello/{name}")
def hello(name: str):
    return {"message": f"Hello, {name}!"}