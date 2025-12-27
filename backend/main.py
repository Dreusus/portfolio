from contextlib import asynccontextmanager
import time

import uvicorn
from fastapi import FastAPI, Body, Request
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response

from db import engine, Base, get_user_request, add_request_data, log_http_request
from grok_client import get_answer_for_grok


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(lifespan=lifespan, title="Backend portfolio")


class RequestLoggingMiddleware(BaseHTTPMiddleware):

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

        log_http_request(
            ip_address=ip_address,
            method=method,
            path=path,
            query_params=query_params,
            user_agent=user_agent,
            referer=referer,
            status_code=response.status_code,
            response_time_ms=response_time_ms
        )

        return response


app.add_middleware(RequestLoggingMiddleware)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://apolyakov.tech",
        "https://www.apolyakov.tech",
        "https://www.api.apolyakov.tech",
        "https://api.apolyakov.tech",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_real_ip(request: Request) -> str:
    forwarded_for = request.headers.get("X-Forwarded-For")
    if forwarded_for:
        return forwarded_for.split(",")[0].strip()

    real_ip = request.headers.get("X-Real-IP")
    if real_ip:
        return real_ip
    return request.client.host or "127.0.0.1"


@app.get("/request")
def get_my_request(request: Request):
    user_ip_address = get_real_ip(request)
    user_requests = get_user_request(ip_address=user_ip_address)
    return user_requests


@app.post("/request")
def send_prompt(request: Request, prompt: str = Body(embed=True)):
    answer = get_answer_for_grok(prompt)
    user_ip = get_real_ip(request)
    user_agent = request.headers.get("user-agent")

    add_request_data(
        ip_address=user_ip,
        prompt=prompt,
        response=answer,
        user_agent=user_agent
    )
    return {"answer": answer}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000)
