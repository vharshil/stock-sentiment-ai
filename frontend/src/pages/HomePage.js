import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import SentimentCards from '../components/SentimentCards';
import SentimentChart from '../components/SentimentChart';
import NewsFeed from '../components/NewsFeed';
import AIChatBox from '../components/AIChatBox';
import './HomePage.css';

const MOCK_RESULT = {
  company: 'Tata Motors',
  articles_count: 5,
  sentiment: {
    bullish: 60,
    bearish: 25,
    neutral: 15,
    verdict: 'Bullish',
    score: 60,
  },
  chart_data: [
    { name: 'Bullish', value: 60 },
    { name: 'Bearish', value: 25 },
    { name: 'Neutral', value: 15 },
  ],
  articles: [
    { title: 'Company reports strong quarterly earnings, beats expectations', source: 'Reuters', url: '#', published_at: 'Jun 25, 2025', sentiment: 'Bullish' },
    { title: 'Analysts remain cautious amid global uncertainty', source: 'Bloomberg', url: '#', published_at: 'Jun 24, 2025', sentiment: 'Bearish' },
    { title: 'New product launch drives investor optimism', source: 'Economic Times', url: '#', published_at: 'Jun 23, 2025', sentiment: 'Bullish' },
    { title: 'Market volatility impacts share price this week', source: 'Mint', url: '#', published_at: 'Jun 22, 2025', sentiment: 'Neutral' },
    { title: 'Strategic partnership announced with global tech firm', source: 'Financial Times', url: '#', published_at: 'Jun 21, 2025', sentiment: 'Bullish' },
  ],
};

function HomePage() {
  const [, setQuery] = useState('');
  const [results, setResults] = useState(null);

  const handleSearch = (company) => {
    setQuery(company);
    setResults({ ...MOCK_RESULT, company });
  };

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <p className="hero-eyebrow">Powered by Gemini AI + Live News</p>
          <h1 className="hero-title">
            Know what the{' '}
            <span className="hero-highlight">market feels</span>
            <br />
            before you decide
          </h1>
          <p className="hero-subtitle">
            Type any company name. We fetch live news and AI tells
            you if sentiment is Bullish, Bearish or Neutral in seconds.
          </p>
          <SearchBar onSearch={handleSearch} />
          <div className="hero-examples">
            <p className="examples-label">Try searching:</p>
            <div className="example-chips">
              {['Reliance', 'Tata Motors', 'Apple', 'Tesla', 'Infosys'].map((name) => (
                <button key={name} className="chip" onClick={() => handleSearch(name)}>
                  {name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {results && (
        <section className="results-section">
          <div className="results-header">
            <h2 className="results-title">
              Sentiment Analysis —{' '}
              <span className="results-company">{results.company}</span>
            </h2>
            <p className="results-meta">
              Based on {results.articles_count} articles · Just now
            </p>
          </div>
          <SentimentCards sentiment={results.sentiment} />
          <div className="two-col-grid">
            <SentimentChart data={results.chart_data} />
            <NewsFeed articles={results.articles} />
          </div>
          <AIChatBox company={results.company} />
        </section>
      )}
    </div>
  );
}

export default HomePage;