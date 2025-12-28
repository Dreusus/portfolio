from pydantic import BaseModel, ConfigDict
from datetime import datetime


class ChatPromptRequest(BaseModel):
    prompt: str


class ChatResponseSchema(BaseModel):
    answer: str


class ChatHistoryItem(BaseModel):
    """Элемент истории чата"""
    model_config = ConfigDict(from_attributes=True)

    id: int
    prompt: str
    response: str
    created_at: datetime
    user_agent: str | None


class ChatHistoryResponse(BaseModel):
    items: list[ChatHistoryItem]
