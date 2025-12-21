from contextlib import asynccontextmanager

import uvicorn
from fastapi import FastAPI, Body, Request
from fastapi.middleware.cors import CORSMiddleware

from db import engine, Base, get_user_request, add_request_data
from gemini_client import get_answer_for_gemini


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(lifespan=lifespan, title="Backend portfolio")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/request")
def get_my_request(request: Request):
    user_ip_address = request.client.host
    user_requests = get_user_request(ip_address=user_ip_address)
    return user_requests


@app.post("/request")
def send_prompt(request: Request, prompt: str = Body(embed=True)):
    answer = get_answer_for_gemini(prompt)
    add_request_data(ip_address=request.client.host, prompt=prompt, response=answer)
    return {"answer": answer}



if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000)
