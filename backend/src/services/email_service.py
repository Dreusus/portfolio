import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from src.core.config import settings


class EmailService:
    def __init__(self):
        self.smtp_host = settings.smtp_host
        self.smtp_port = settings.smtp_port
        self.smtp_user = settings.smtp_user
        self.smtp_password = settings.smtp_password
        self.contact_email = settings.contact_email
        self.enabled = bool(self.smtp_user and self.smtp_password)

    def send_contact_form(self, name: str, email: str, message: str) -> bool:
        if not self.enabled:
            print("Email service not configured")
            return False

        try:
            msg = MIMEMultipart("alternative")
            msg["Subject"] = f"Новое сообщение с сайта от {name}"
            msg["From"] = self.smtp_user
            msg["To"] = self.contact_email
            msg["Reply-To"] = email

            text_content = f"""
Новое сообщение с контактной формы

Имя: {name}
Email: {email}

Сообщение:
{message}
"""

            html_content = f"""
<!DOCTYPE html>
<html>
<head>
    <style>
        body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
        .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
        .header {{ background: #93b18b; color: white; padding: 20px; border-radius: 8px 8px 0 0; }}
        .content {{ background: #f8faf6; padding: 20px; border-radius: 0 0 8px 8px; }}
        .field {{ margin-bottom: 15px; }}
        .label {{ font-weight: bold; color: #555; }}
        .message {{ background: white; padding: 15px; border-radius: 8px; margin-top: 10px; }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Новое сообщение с сайта</h2>
        </div>
        <div class="content">
            <div class="field">
                <span class="label">Имя:</span> {name}
            </div>
            <div class="field">
                <span class="label">Email:</span> <a href="mailto:{email}">{email}</a>
            </div>
            <div class="field">
                <span class="label">Сообщение:</span>
                <div class="message">{message}</div>
            </div>
        </div>
    </div>
</body>
</html>
"""

            msg.attach(MIMEText(text_content, "plain"))
            msg.attach(MIMEText(html_content, "html"))

            context = ssl.create_default_context()
            with smtplib.SMTP_SSL(self.smtp_host, self.smtp_port, context=context) as server:
                server.login(self.smtp_user, self.smtp_password)
                server.sendmail(self.smtp_user, self.contact_email, msg.as_string())

            print(f"Email sent successfully to {self.contact_email}")
            return True

        except Exception as e:
            print(f"Failed to send email: {e}")
            return False


email_service = EmailService()
