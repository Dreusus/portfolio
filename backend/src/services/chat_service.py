from typing import Optional
from src.repositories.chat_repository import ChatRepository
from src.services.ai.groq_provider import GroqProvider
from src.services.ai.gemini_provider import GeminiProvider
from src.services.telegram_service import TelegramService
from src.core.exceptions import AIProviderError


class ChatService:
    """Сервис для работы с чатом"""

    def __init__(self, chat_repo: ChatRepository):
        self.chat_repo = chat_repo
        self.primary_ai = GroqProvider()
        self.telegram = TelegramService()

    def get_chat_history(self, ip_address: str):
        return self.chat_repo.get_by_ip(ip_address)

    def process_prompt(
            self,
            ip_address: str,
            prompt: str,
            user_agent: Optional[str] = None
    ) -> str:
        try:
            answer = self.primary_ai.get_answer(prompt)
        except AIProviderError:
            try:
                fallback_ai = GeminiProvider()
                answer = fallback_ai.get_answer(prompt)
            except (AIProviderError, ValueError):
                answer = "Извините, все AI сервисы временно недоступны."

        self.chat_repo.create(
            ip_address=ip_address,
            prompt=prompt,
            response=answer,
            user_agent=user_agent
        )

        self.telegram.send_alert(
            ip_address=ip_address,
            prompt=prompt,
            response=answer,
            user_agent=user_agent
        )

        return answer
