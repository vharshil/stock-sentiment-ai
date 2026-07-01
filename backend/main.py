

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

from news_service import fetch_news

load_dotenv()

app = FastAPI(
    title="MarketPulse AI Backend",
    description="Backend API for stock sentiment and trend analysis",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:8002"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    """Health check endpoint"""
    return {"status": "ok", "message": "MarketPulse AI Backend is running 🚀"}


@app.get("/news")
async def get_news(company: str):
    """
    Fetches live news headlines for a given company.
    Try it: http://localhost:8000/news?company=Tata Motors
    """
    if not company or len(company.strip()) < 2:
        raise HTTPException(status_code=400, detail="Company name too short")

    articles = await fetch_news(company.strip())

    if not articles:
        raise HTTPException(status_code=404, detail=f"No news found for '{company}'")

    return {
        "company": company,
        "articles_count": len(articles),
        "articles": articles,
    }