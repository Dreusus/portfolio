import os
from pydantic_settings import BaseSettings
from pydantic import Field


class Settings(BaseSettings):
    database_url: str = Field(..., env="DATABASE_URL")

    gemini_api_key: str = Field(default="", env="GEMINI_API_KEY")
    grok_api_key: str = Field(..., env="GROK_API_KEY")

    telegram_bot_token: str = Field(default="", env="TELEGRAM_BOT_TOKEN")
    telegram_chat_id: str = Field(default="", env="TELEGRAM_CHAT_ID")

    cors_origins: list[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://apolyakov.tech",
        "https://www.apolyakov.tech",
        "https://api.apolyakov.tech",
        "https://www.api.apolyakov.tech",
    ]

    class Config:
        env_file = ".env"
        case_sensitive = False


settings = Settings()
