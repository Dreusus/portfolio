from google import genai
from google.genai import types
from config import config_obj

MODEL_FALLBACK_LIST = [
    "gemini-3-flash",        # Нужна v1beta
    "gemma-3-27b",           # Нужна v1beta
    "gemini-2.0-flash-exp",  # Попробуйте экспериментальную версию, она часто жива
    "gemini-1.5-flash",      # Стабильная, часто имеет свои лимиты, отличные от 2.5
    "gemini-2.5-flash",      # (Лимит исчерпан, но пусть будет в конце)
]

client = genai.Client(
    api_key=config_obj.gemini_api_key,
    http_options={'api_version': 'v1beta'}
)


def get_answer_for_gemini(prompt: str):
    last_error = None

    print(f"Запрос: {prompt[:30]}...")

    for model_name in MODEL_FALLBACK_LIST:
        try:
            response = client.models.generate_content(
                model=model_name,
                contents=prompt
            )
            print(f"✅ Успех на модели: {model_name}")
            return response.text

        except Exception as e:
            print(f"⚠️ Модель {model_name} недоступна (Ошибка: {str(e)[:50]}...). Переключаюсь...")
            last_error = e
            continue

    return f"❌ Все модели недоступны. Последняя ошибка: {last_error}"
