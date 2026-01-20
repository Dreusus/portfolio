from fastapi import Request, Depends
from sqlalchemy.orm import Session
from src.core.database import get_db
from src.repositories.chat_repository import ChatRepository
from src.repositories.project_repository import ProjectRepository
from src.services.chat_service import ChatService
from src.services.project_service import ProjectService


def get_real_ip(request: Request) -> str:
    forwarded_for = request.headers.get("X-Forwarded-For")
    if forwarded_for:
        return forwarded_for.split(",")[0].strip()

    real_ip = request.headers.get("X-Real-IP")
    if real_ip:
        return real_ip

    return request.client.host or "127.0.0.1"


def get_chat_service(db: Session = Depends(get_db)) -> ChatService:
    chat_repo = ChatRepository(db)
    return ChatService(chat_repo)


def get_project_service(db: Session = Depends(get_db)) -> ProjectService:
    project_repo = ProjectRepository(db)
    return ProjectService(project_repo)
