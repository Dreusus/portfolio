from typing import Optional
from sqlalchemy import select
from sqlalchemy.orm import Session
from src.models.chat import ChatRequest


class ChatRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_ip(self, ip_address: str) -> list[ChatRequest]:
        query = select(ChatRequest).filter_by(ip_address=ip_address)
        result = self.db.execute(query)
        return list(result.scalars().all())

    def create(
        self,
        ip_address: str,
        prompt: str,
        response: str,
        user_agent: Optional[str] = None,
        session_id: Optional[str] = None
    ) -> ChatRequest:
        chat_request = ChatRequest(
            ip_address=ip_address,
            prompt=prompt,
            response=response,
            user_agent=user_agent,
            session_id=session_id
        )
        self.db.add(chat_request)
        self.db.commit()
        self.db.refresh(chat_request)
        return chat_request
