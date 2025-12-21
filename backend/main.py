from contextlib import asynccontextmanager

import uvicorn
from fastapi import FastAPI, Body, Request
from fastapi.middleware.cors import CORSMiddleware

from db import engine, Base, get_user_request, add_request_data
from gemini_client import get_answer_for_gemini
from grok_client import get_answer_for_grok


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(lifespan=lifespan, title="Backend portfolio")

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
    # answer = get_answer_for_gemini(prompt)
    answer = get_answer_for_grok(prompt)
    add_request_data(ip_address=request.client.host, prompt=prompt, response=answer)
    return {"answer": answer}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000)
