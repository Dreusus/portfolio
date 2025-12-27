import time
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from src.api.dependencies import get_real_ip
from src.core.database import SessionLocal
from src.repositories.log_repository import LogRepository


class RequestLoggingMiddleware(BaseHTTPMiddleware):
    """Middleware для логирования всех HTTP запросов"""

    async def dispatch(self, request: Request, call_next):
        start_time = time.time()
        ip_address = get_real_ip(request)

        method = request.method
        path = request.url.path
        query_params = str(request.url.query) if request.url.query else None
        user_agent = request.headers.get("user-agent")
        referer = request.headers.get("referer")

        response = await call_next(request)

        response_time_ms = int((time.time() - start_time) * 1000)

        # Логируем запрос в БД
        db = SessionLocal()
        try:
            log_repo = LogRepository(db)
            log_repo.create_log(
                ip_address=ip_address,
                method=method,
                path=path,
                query_params=query_params,
                user_agent=user_agent,
                referer=referer,
                status_code=response.status_code,
                response_time_ms=response_time_ms
            )
        finally:
            db.close()

        return response
