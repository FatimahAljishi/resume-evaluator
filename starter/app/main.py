from fastapi import FastAPI
from app.routers.auth import router 

app = FastAPI(title="Resume Evaluator API")

app.include_router(router, prefix="/auth")

@app.get("/")
def root():
    return {"message": "Hello from FastAPI!"}

@app.get("/ping")
def ping():
    return {"status": "ok"}

@app.get("/hello/{name}")
def hello(name: str):
    return {"message": f"Hello, {name}!"}