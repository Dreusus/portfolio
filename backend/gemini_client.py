from google import genai

from config import config_obj

client = genai.Client(api_key=config_obj.gemini_api_key)


def get_answer_for_gemini(prompt: str):
    response = client.models.generate_content(
        model="gemma-3-12b",
        contents=prompt
    )
    return response.text
