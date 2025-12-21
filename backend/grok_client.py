from groq import Groq, RateLimitError, APIError
from config import config_obj

client = Groq(api_key=config_obj.grok_api_key)

MODELS_PRIORITY = [
    "llama-3.3-70b-versatile",
    "llama-3.1-8b-instant",
]


def load_andrey_context():
    return """
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


def get_answer_for_grok(user_prompt: str):
    context_data = load_andrey_context()

    system_instruction = f"""
    Ты — лаконичный информатор об Андрее.
    Твоя цель — отвечать метко, коротко и с легкой харизмой.

    [[ДОСЬЕ]]
    {context_data}
    [[КОНЕЦ]]

    ЖЕСТКИЕ ПРАВИЛА:
    1. **КРАТКОСТЬ — СЕСТРА ТАЛАНТА:** Твой ответ не должен превышать 2-3 предложений.
    2. **НЕ СПАМЬ:** Если спрашивают "Что в личной жизни?", скажи ТОЛЬКО про девушку. Не нужно перечислять друзей, кота, машину и размер члена в одном ответе, если об этом не спросили прямо.
    3. **ИЗБИРАТЕЛЬНОСТЬ:** Выбирай только самый релевантный факт(ОДИН) для ответа.
    4. **СТИЛЬ:** Отвечай как человек, который ценит свое и чужое время. Без воды.
    """

    messages = [
        {"role": "system", "content": system_instruction},
        {"role": "user", "content": user_prompt}
    ]

    for model_name in MODELS_PRIORITY:
        try:
            response = client.chat.completions.create(
                messages=messages,
                model=model_name,
                temperature=0.5,
                max_tokens=100,
            )
            return response.choices[0].message.content

        except (RateLimitError, APIError) as e:
            print(f"Ошибка {e}, скип...")
            continue

    return "Сервер занят."

    return "⛔️ Все модели заняты."