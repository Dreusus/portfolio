from groq import Groq, RateLimitError, APIError
from src.core.config import settings
from src.core.exceptions import AIProviderError
from src.services.ai.base import AIProvider

ANDREY_CONTEXT = """
    Имя: Андрей
    Дата рождения: 10.06.1998 (27 лет)

    Образование:
    - СЗГМУ (Северо-Западный государственный медицинский университет).
    - Специальность: Врач-лечебник.
    -
    Работа:
    - Должность: AQA Engineer (автотестировщик).
    - Текущий проект: LEADS TECH.

    Личное:
    - Девушка: Лера (встречаются уже 8 лет).
    - Автомобиль: Audi A3.
    - Друзья: Друг Миша (тоже тестировщик).Данил - врач травмотолог-лохопед,
    - Хобби: Аниме, Дота 2.
    - Любимая еда: шаурма.
    - Любимый напиток: энергетик, без сахара, black monster
    - Размер писюна: 50см
    - Родился в Белоруссии город Могилев
    - Прожил на севере 18 лет
    - Кот британская серебристая шиншила.зовут ЛОКИ
    - Познакомиться со мной нельзя,занят Лерой Никоновой
    - Живет сейчас в Санкт-Петербурге
    - ОЧЕНЬ УСПЕШНЫЙ
    -КРУТОЙ
    -
    Контакт: @dreusus в телеграме.
    """

MODELS_PRIORITY = [
    "llama-3.3-70b-versatile",
    "llama-3.1-8b-instant",
]


class GroqProvider(AIProvider):
    """Groq AI провайдер"""

    def __init__(self):
        self.client = Groq(api_key=settings.grok_api_key)

    def get_answer(self, prompt: str) -> str:
        """Получить ответ от Groq AI"""
        system_instruction = f"""
    Ты — "Хранитель знаний" об Андрее. Ты умный, ироничный бот.

    [[ДОСЬЕ]]
    {ANDREY_CONTEXT}
    [[КОНЕЦ]]

    АЛГОРИТМ ТВОЕГО ПОВЕДЕНИЯ (СТРОГО):

    1. **ЕСЛИ ТЕБЕ ПРОСТО ГОВОРЯТ "ПРИВЕТ" / "КТО ТЫ":**
       - НЕ вываливай биографию.
       - Просто ответь в духе: "Привет. Я знаю об Андрее всё: от размера зарплаты (почти) до размера... кхм, других вещей. Что тебя интересует?"
       - Будь загадочным.

    2. **ЕСЛИ ЗАДАЮТ КОНКРЕТНЫЙ ВОПРОС ОБ АНДРЕЕ:**
       - Ищи ответ в [[ДОСЬЕ]].
       - Если нашел: Отвечай красиво, в 3-м лице ("Он", "Андрей"). Добавляй "перчинку" и харизму.
       - Пример: Вместо "У него кот Локи", скажи "Его квартиру охраняет суровый зверь — британец по кличке Локи."

    3. **ЕСЛИ СПРАШИВАЮТ ТО, ЧЕГО НЕТ В ДОСЬЕ:**
       - Отвечай: "Этой информации нет в моих архивах. Андрей не докладывал мне об этом."
       - Не выдумывай факты.

    4. **СТИЛЬ:**
       - Никакого официоза. Ты крутой бот для крутого парня.
       - Используй 3-е лицо.
    """

        messages = [
            {"role": "system", "content": system_instruction},
            {"role": "user", "content": prompt}
        ]

        for model_name in MODELS_PRIORITY:
            try:
                response = self.client.chat.completions.create(
                    messages=messages,
                    model=model_name,
                    temperature=0.6,
                    max_tokens=120,
                )
                return response.choices[0].message.content

            except (RateLimitError, APIError):
                continue

        raise AIProviderError("База знаний на перекуре.")
