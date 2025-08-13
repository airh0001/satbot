from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import declarative_base
from pydantic import BaseModel, EmailStr

Base = declarative_base()

# SQLAlchemy ORM Model
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, nullable=True)


# Pydantic Schemas
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: str | None = None


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserOut(BaseModel):
    id: int
    email: EmailStr
    full_name: str | None

    class Config:
        orm_mode = True
