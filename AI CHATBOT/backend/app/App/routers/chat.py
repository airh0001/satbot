from fastapi import APIRouter, WebSocket
from pydantic import BaseModel
from ..chatbot import answer

router = APIRouter(tags=["chat"])

class ChatRequest(BaseModel):
    message: str
    user_id: str

@router.post("/chat")
async def chat(req: ChatRequest):
    reply = answer(req.message, req.user_id)
    return {"reply": reply}

@router.websocket("/ws/chat")
async def chat_ws(ws: WebSocket):
    await ws.accept()
    try:
        while True:
            data = await ws.receive_json()
            reply = answer(data["message"], data.get("user_id", "anon"))
            await ws.send_json({"reply": reply})
    except Exception:
        await ws.close()