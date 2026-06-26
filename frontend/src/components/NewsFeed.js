import React from 'react';
import './NewsFeed.css';

function NewsFeed({ articles }) {
  const sentimentStyle = {
    Bullish: { color: '#00D68F', background: 'rgba(0,214,143,0.1)', border: 'rgba(0,214,143,0.25)' },
    Bearish: { color: '#FF4D6A', background: 'rgba(255,77,106,0.1)', border: 'rgba(255,77,106,0.25)' },
    Neutral: { color: '#FFB830', background: 'rgba(255,184,48,0.1)', border: 'rgba(255,184,48,0.25)' },
  };

  return (
    <div className="newsfeed-card">
      <h3 className="newsfeed-title">Live News Headlines</h3>
      <p className="newsfeed-subtitle">{articles.length} articles analysed</p>
      <div className="articles-list">
        {articles.map((article, i) => {
          const style = sentimentStyle[article.sentiment] || sentimentStyle.Neutral;
          return (
            <a key={i} href={article.url} target="_blank" rel="noopener noreferrer" className="article-item">
              <div className="article-top">
                <span className="article-source">{article.source}</span>
                <span className="article-tag" style={{ color: style.color, background: style.background, borderColor: style.border }}>
                  {article.sentiment}
                </span>
              </div>
              <p className="article-title">{article.title}</p>
              <p className="article-date">{article.published_at}</p>
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default NewsFeed;