from sqlmodel import SQLModel, create_engine, Session #type: ignore
import os

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///resume.db")
engine = create_engine(DATABASE_URL, echo=True)

def create_db():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session
