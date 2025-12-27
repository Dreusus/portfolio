from google import genai
from src.core.config import settings
from src.core.exceptions import AIProviderError
from src.services.ai.base import AIProvider

MODEL_FALLBACK_LIST = [
    "gemini-2.5-flash-lite",
    "gemini-2.5-flash",
    "gemini-2.5-flash-tts",
    "gemini-3-flash"
]


class GeminiProvider(AIProvider):
    """Gemini AI провайдер"""

    def __init__(self):
        if not settings.gemini_api_key:
            raise ValueError("GEMINI_API_KEY не установлен")
        self.client = genai.Client(api_key=settings.gemini_api_key)

    def get_answer(self, prompt: str) -> str:
        """Получить ответ от Gemini AI"""
        for model_name in MODEL_FALLBACK_LIST:
            try:
                response = self.client.models.generate_content(
                    model=model_name,
                    contents=prompt
                )
                return response.text
            except Exception:
                continue

        raise AIProviderError("Все модели Gemini недоступны")
