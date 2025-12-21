from sqlalchemy import create_engine, select
from sqlalchemy.orm import sessionmaker, DeclarativeBase, Mapped
from sqlalchemy.testing.schema import mapped_column

engine = create_engine(url="sqlite:///chat_requests.db")
session = sessionmaker(bind=engine)


class Base(DeclarativeBase):
    pass


class ChatRequest(Base):
    __tablename__ = "chat_requests"

    id: Mapped[int] = mapped_column(primary_key=True)
    ip_address: Mapped[str] = mapped_column(index=True)
    prompt: Mapped[str]
    response: Mapped[str]


def get_user_request(ip_address: str) -> list[ChatRequest]:
    with session() as new_session:
        query = select(ChatRequest).filter_by(ip_address=ip_address)
        result = new_session.execute(query)
        return result.scalars().all()


def add_request_data(ip_address: str, prompt: str, response: str):
    with session() as new_session:
        new_request = ChatRequest(ip_address=ip_address, prompt=prompt, response=response)
        new_session.add(new_request)
        new_session.commit()
