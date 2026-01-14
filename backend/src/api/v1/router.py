from fastapi import APIRouter
from src.api.v1.endpoints import chat, health, contact

api_v1_router = APIRouter(prefix="/api/v1")

api_v1_router.include_router(chat.router)
api_v1_router.include_router(health.router)
api_v1_router.include_router(contact.router)
