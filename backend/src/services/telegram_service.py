import requests
from typing import Optional
from src.core.config import settings


class TelegramService:
    def __init__(self):
        self.bot_token = settings.telegram_bot_token
        self.chat_id = settings.telegram_chat_id
        self.enabled = bool(self.bot_token and self.chat_id)

    def send_alert(self, ip_address: str, prompt: str, user_agent: Optional[str] = None) -> bool:
        if not self.enabled:
            print("⚠ Telegram alert skipped: service not enabled")
            return False

        print(f"📤 Sending Telegram alert to {self.chat_id}: {prompt[:50]}...")

        try:
            message = self._format_message(ip_address, prompt, user_agent)

            url = f"https://api.telegram.org/bot{self.bot_token}/sendMessage"
            payload = {
                "chat_id": self.chat_id,
                "text": message,
                "parse_mode": "HTML",
                "disable_web_page_preview": True
            }

            response = requests.post(url, json=payload, timeout=5)
            return response.status_code == 200

        except Exception as e:
            print(f"Failed to send Telegram alert: {e}")
            return False

    def _format_message(self, ip_address: str, prompt: str, user_agent: Optional[str] = None) -> str:
        max_prompt_length = 200
        if len(prompt) > max_prompt_length:
            prompt = prompt[:max_prompt_length] + "..."

        prompt = prompt.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")

        message = f"🤖 <b>Новый запрос к AI ассистенту</b>\n\n"
        message += f"👤 <b>IP:</b> <code>{ip_address}</code>\n"
        message += f"💬 <b>Запрос:</b>\n{prompt}\n"

        if user_agent:
            browser = self._extract_browser(user_agent)
            if browser:
                message += f"\n🌐 <b>Браузер:</b> {browser}"

        return message

    def _extract_browser(self, user_agent: str) -> Optional[str]:
        if not user_agent:
            return None

        user_agent_lower = user_agent.lower()

        if "edg" in user_agent_lower:
            return "Edge"
        elif "chrome" in user_agent_lower and "safari" in user_agent_lower:
            return "Chrome"
        elif "firefox" in user_agent_lower:
            return "Firefox"
        elif "safari" in user_agent_lower:
            return "Safari"
        elif "opera" in user_agent_lower or "opr" in user_agent_lower:
            return "Opera"

        return None
