import os
from datetime import datetime
from sqlalchemy import create_engine, select, String, Text, DateTime, Integer, Index
from sqlalchemy.orm import sessionmaker, DeclarativeBase, Mapped, mapped_column
from typing import Optional


DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError(
        "DATABASE_URL environment variable is required!\n"
        "Example: DATABASE_URL=postgresql://user:password@localhost:5432/dbname"
    )

engine = create_engine(
    url=DATABASE_URL,
    pool_pre_ping=True,
    pool_size=10,
    max_overflow=20,
    echo=False
)
session = sessionmaker(bind=engine)


class Base(DeclarativeBase):
    pass


class ChatRequest(Base):
    """Логирование запросов к AI чату"""
    __tablename__ = "chat_requests"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    ip_address: Mapped[str] = mapped_column(String(45), index=True)  # IPv6 поддержка
    prompt: Mapped[str] = mapped_column(Text)
    response: Mapped[str] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, index=True)
    user_agent: Mapped[Optional[str]] = mapped_column(String(512), nullable=True)
    session_id: Mapped[Optional[str]] = mapped_column(String(64), nullable=True, index=True)

    __table_args__ = (
        Index('idx_chat_ip_created', 'ip_address', 'created_at'),
    )


class RequestLog(Base):
    """Логирование всех HTTP запросов к серверу"""
    __tablename__ = "request_logs"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    timestamp: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, index=True)
    ip_address: Mapped[str] = mapped_column(String(45), index=True)
    method: Mapped[str] = mapped_column(String(10))  # GET, POST, etc.
    path: Mapped[str] = mapped_column(String(2048))
    query_params: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    user_agent: Mapped[Optional[str]] = mapped_column(String(512), nullable=True)
    referer: Mapped[Optional[str]] = mapped_column(String(2048), nullable=True)
    status_code: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    response_time_ms: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)  # время обработки в мс
    session_id: Mapped[Optional[str]] = mapped_column(String(64), nullable=True, index=True)

    __table_args__ = (
        Index('idx_request_timestamp', 'timestamp'),
        Index('idx_request_ip_timestamp', 'ip_address', 'timestamp'),
        Index('idx_request_path', 'path'),
    )


def get_user_request(ip_address: str) -> list[ChatRequest]:
    with session() as new_session:
        query = select(ChatRequest).filter_by(ip_address=ip_address)
        result = new_session.execute(query)
        return result.scalars().all()


def add_request_data(
    ip_address: str,
    prompt: str,
    response: str,
    user_agent: Optional[str] = None,
    session_id: Optional[str] = None
):
    """Добавить запрос к AI чату в БД"""
    with session() as new_session:
        new_request = ChatRequest(
            ip_address=ip_address,
            prompt=prompt,
            response=response,
            user_agent=user_agent,
            session_id=session_id
        )
        new_session.add(new_request)
        new_session.commit()


def log_http_request(
    ip_address: str,
    method: str,
    path: str,
    query_params: Optional[str] = None,
    user_agent: Optional[str] = None,
    referer: Optional[str] = None,
    status_code: Optional[int] = None,
    response_time_ms: Optional[int] = None,
    session_id: Optional[str] = None
):
    """Логировать HTTP запрос в БД"""
    try:
        with session() as new_session:
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
            new_session.add(log_entry)
            new_session.commit()
    except Exception as e:
        # Не падаем, если логирование не удалось
        print(f"Failed to log request: {e}")
