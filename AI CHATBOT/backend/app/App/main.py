from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from app import models, auth, chatbot
from App.deps import get_db

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/datasets")
def list_datasets(db: Session = Depends(get_db)):
    return db.query(models.Dataset).all()

@app.post("/chat")
async def chat_endpoint(message: dict):
    question = message.get("question")
    if not question:
        raise HTTPException(status_code=400, detail="Question required")
    answer = await chatbot.ask_question(question)
    return {"answer": answer}

@app.post("/auth/signup")
def signup(user: auth.UserCreate, db: Session = Depends(get_db)):
    return auth.create_user(db, user)

@app.post("/auth/login")
def login(form_data=Depends(auth.OAuth2PasswordRequestForm), db: Session = Depends(get_db)):
    return auth.login_user(db, form_data)
@app.get("/auth/me")
def read_users_me(current_user: auth.User = Depends(auth.get_current_active_user)):
    return current_user