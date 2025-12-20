from contextlib import asynccontextmanager

from fastapi import FastAPI, Body, Request

from db import engine, Base, get_user_request, add_request_data
from gemini_client import get_answer_for_gemini


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(lifespan=lifespan, title="Backend portfolio")


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
