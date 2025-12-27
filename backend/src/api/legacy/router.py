from fastapi import APIRouter, Request, Depends, Body
from src.api.dependencies import get_real_ip, get_chat_service
from src.services.chat_service import ChatService

legacy_router = APIRouter(tags=["Legacy (deprecated)"])


@legacy_router.get("/request", deprecated=True)
def get_request_legacy(
    request: Request,
    chat_service: ChatService = Depends(get_chat_service)
):
    """
    DEPRECATED: Используйте GET /api/v1/chat/history

    Получить историю чатов по IP адресу
    """
    ip_address = get_real_ip(request)
    return chat_service.get_chat_history(ip_address)


@legacy_router.post("/request", deprecated=True)
def send_prompt_legacy(
    request: Request,
    prompt: str = Body(..., embed=True),
    chat_service: ChatService = Depends(get_chat_service)
):
    """
    DEPRECATED: Используйте POST /api/v1/chat

    Отправить промпт AI и получить ответ
    """
    ip_address = get_real_ip(request)
    user_agent = request.headers.get("user-agent")
    answer = chat_service.process_prompt(ip_address, prompt, user_agent)
    return {"answer": answer}
