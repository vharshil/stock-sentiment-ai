from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os

from news_service import fetch_news
from gemini_service import analyze_sentiment, answer_question

load_dotenv()

app = FastAPI(
    title="MarketPulse AI Backend",
    description="Backend API for stock sentiment and trend analysis",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:8002",
        "http://localhost:8003",
        "http://localhost:8004",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    question: str
    company: str
    context: str


@app.get("/")
def root():
    return {"status": "ok", "message": "MarketPulse AI Backend is running 🚀"}


@app.get("/analyze")
async def analyze(company: str):
    if not company or len(company.strip()) < 2:
        raise HTTPException(status_code=400, detail="Company name too short")

    company = company.strip()
    articles = await fetch_news(company)

    if not articles:
        raise HTTPException(status_code=404, detail=f"No news found for {company}")

    sentiment_result = await analyze_sentiment(company, articles)

    return {
        "company": company,
        "articles_count": len(articles),
        "articles": articles,
        "sentiment": sentiment_result["sentiment"],
        "summary": sentiment_result.get("summary", ""),
        "chart_data": sentiment_result["chart_data"],
    }


@app.post("/chat")
async def chat(body: ChatRequest):
    answer = await answer_question(
        question=body.question,
        company=body.company,
        context=body.context
    )
    return {"answer": answer}


@app.get("/news")
async def get_news(company: str):
    articles = await fetch_news(company)
    return {"company": company, "articles_count": len(articles), "articles": articles}