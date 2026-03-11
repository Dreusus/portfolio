from fastapi import APIRouter, Request, Depends, Body
from src.api.dependencies import get_real_ip, get_chat_service
from src.services.chat_service import ChatService
from src.schemas.chat import (
    ChatResponseSchema,
    ChatHistoryResponse,
    ChatHistoryItem
)

router = APIRouter(prefix="/chat", tags=["Chat"])


@router.get("/history", response_model=ChatHistoryResponse)
def get_chat_history(
    request: Request,
    chat_service: ChatService = Depends(get_chat_service)
):
    """Получить историю чата для текущего IP"""
    ip_address = get_real_ip(request)
    history = chat_service.get_chat_history(ip_address)

    return ChatHistoryResponse(
        items=[ChatHistoryItem.model_validate(item) for item in history]
    )


@router.post("", response_model=ChatResponseSchema)
def send_chat_prompt(
    request: Request,
    prompt: str = Body(..., embed=True),
    chat_service: ChatService = Depends(get_chat_service)
):
    """Отправить промпт AI и получить ответ"""
    ip_address = get_real_ip(request)
    user_agent = request.headers.get("user-agent")

    answer = chat_service.process_prompt(
        ip_address=ip_address,
        prompt=prompt,
        user_agent=user_agent
    )

    return ChatResponseSchema(answer=answer)
