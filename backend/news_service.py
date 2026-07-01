import httpx
import os
from datetime import datetime, timedelta
from dotenv import load_dotenv

load_dotenv()

NEWS_API_KEY = os.getenv("NEWS_API_KEY")
NEWS_API_URL = "https://newsapi.org/v2/everything"


async def fetch_news(company: str) -> list:
    if not NEWS_API_KEY:
        print("No NEWS_API_KEY found — returning mock data")
        return _mock_articles(company)

    from_date = (datetime.now() - timedelta(days=7)).strftime("%Y-%m-%d")

    params = {
        "q": company,
        "from": from_date,
        "sortBy": "publishedAt",
        "language": "en",
        "pageSize": 10,
        "apiKey": NEWS_API_KEY,
    }

    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            response = await client.get(NEWS_API_URL, params=params)
            response.raise_for_status()
            data = response.json()

        articles = data.get("articles", [])
        cleaned = []
        for article in articles:
            if not article.get("title") or article["title"] == "[Removed]":
                continue
            cleaned.append({
                "title": article["title"],
                "source": article.get("source", {}).get("name", "Unknown"),
                "url": article.get("url", "#"),
                "published_at": _format_date(article.get("publishedAt", "")),
                "description": article.get("description", ""),
                "sentiment": "Neutral",
            })
        return cleaned if cleaned else _mock_articles(company)

    except Exception as e:
        print(f"NewsAPI error: {e}")
        return _mock_articles(company)


def _format_date(iso_string: str) -> str:
    try:
        dt = datetime.strptime(iso_string, "%Y-%m-%dT%H:%M:%SZ")
        return dt.strftime("%b %d, %Y")
    except Exception:
        return "Recent"


def _mock_articles(company: str) -> list:
    return [
        {
            "title": f"{company} reports strong quarterly earnings beating expectations",
            "source": "Economic Times",
            "url": "#",
            "published_at": "Jul 02, 2026",
            "description": "Strong results posted.",
            "sentiment": "Bullish",
        },
        {
            "title": f"Analysts cautious on {company} amid global uncertainty",
            "source": "Reuters",
            "url": "#",
            "published_at": "Jul 01, 2026",
            "description": "Mixed signals from analysts.",
            "sentiment": "Bearish",
        },
        {
            "title": f"{company} announces major expansion plans for 2026",
            "source": "Bloomberg",
            "url": "#",
            "published_at": "Jun 30, 2026",
            "description": "Expansion into new markets.",
            "sentiment": "Bullish",
        },
        {
            "title": f"Market volatility impacts {company} share price this week",
            "source": "Mint",
            "url": "#",
            "published_at": "Jun 29, 2026",
            "description": "Shares fell amid broader selloff.",
            "sentiment": "Bearish",
        },
        {
            "title": f"{company} partners with global tech firm for digital push",
            "source": "Financial Times",
            "url": "#",
            "published_at": "Jun 28, 2026",
            "description": "Strategic partnership announced.",
            "sentiment": "Bullish",
        },
    ]