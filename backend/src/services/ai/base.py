from abc import ABC, abstractmethod


class AIProvider(ABC):
    """Абстрактный базовый класс для AI провайдеров"""

    @abstractmethod
    def get_answer(self, prompt: str) -> str:
        """Получить ответ от AI на промпт"""
        pass
