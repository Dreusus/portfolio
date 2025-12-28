from typing import Optional
from sqlalchemy.orm import Session
from src.models.log import RequestLog


class LogRepository:
    def __init__(self, db: Session):
        self.db = db

    def create_log(
        self,
        ip_address: str,
        method: str,
        path: str,
        query_params: Optional[str] = None,
        user_agent: Optional[str] = None,
        referer: Optional[str] = None,
        status_code: Optional[int] = None,
        response_time_ms: Optional[int] = None,
        session_id: Optional[str] = None
    ) -> None:
        try:
            log_entry = RequestLog(
                ip_address=ip_address,
                method=method,
                path=path,
                query_params=query_params,
                user_agent=user_agent,
                referer=referer,
                status_code=status_code,
                response_time_ms=response_time_ms,
                session_id=session_id
            )
            self.db.add(log_entry)
            self.db.commit()
        except Exception as e:
            print(f"Failed to log request: {e}")
            self.db.rollback()
