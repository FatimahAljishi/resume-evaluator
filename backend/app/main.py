from fastapi import FastAPI
from app.routers.auth import router 
from app.routers.evaluate import evaluate_router
from app.routers.admin import admin_router
from fastapi.middleware.cors import CORSMiddleware
from app.database import create_db
from app.models import User

app = FastAPI(title="Resume Evaluator API")

app.include_router(router, prefix="/auth")
app.include_router(evaluate_router, prefix="/evaluate")
app.include_router(admin_router, prefix="/admin")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173",
                  "https://resume-evaluator-by-fatimah.vercel.app"],  
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

from sqlmodel import Session
from sqlalchemy import text
from app.database import engine

@app.get("/db-test")
def db_test():
    try:
        with Session(engine) as session:
            session.exec(text("SELECT 1"))
        return {"status": "Database connected successfully"}
    except Exception as e:
        return {"error": str(e)}
