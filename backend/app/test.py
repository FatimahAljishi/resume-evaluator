from sqlmodel import Session, select #type: ignore
from database import engine
from models import User

with Session(engine) as session:
    users = session.exec(select(User)).all()
    print(users)