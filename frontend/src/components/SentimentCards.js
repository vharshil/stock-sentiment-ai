import React from 'react';
import './SentimentCards.css';

function SentimentCards({ sentiment }) {
  const { bullish, bearish, neutral, verdict, score } = sentiment;

  const verdictColor = {
    Bullish: 'var(--accent-green)',
    Bearish: 'var(--accent-red)',
    Neutral: 'var(--accent-yellow)',
  }[verdict];

  const verdictEmoji = {
    Bullish: '🟢',
    Bearish: '🔴',
    Neutral: '🟡',
  }[verdict];

  return (
    <div className="sentiment-cards">

      <div className="card verdict-card" style={{ borderColor: verdictColor }}>
        <p className="card-label">Overall Verdict</p>
        <div className="verdict-main">
          <span className="verdict-emoji">{verdictEmoji}</span>
          <span className="verdict-text" style={{ color: verdictColor }}>
            {verdict}
          </span>
        </div>
        <p className="verdict-score">Confidence: {score}%</p>
        <div className="verdict-bar">
          <div className="verdict-bar-fill" style={{ width: `${score}%`, background: verdictColor }} />
        </div>
      </div>

      <div className="card score-card">
        <p className="card-label">Bullish</p>
        <p className="score-number" style={{ color: 'var(--accent-green)' }}>{bullish}%</p>
        <div className="score-bar">
          <div className="score-fill" style={{ width: `${bullish}%`, background: 'var(--accent-green)' }} />
        </div>
        <p className="score-hint">Positive signals</p>
      </div>

      <div className="card score-card">
        <p className="card-label">Bearish</p>
        <p className="score-number" style={{ color: 'var(--accent-red)' }}>{bearish}%</p>
        <div className="score-bar">
          <div className="score-fill" style={{ width: `${bearish}%`, background: 'var(--accent-red)' }} />
        </div>
        <p className="score-hint">Negative signals</p>
      </div>

      <div className="card score-card">
        <p className="card-label">Neutral</p>
        <p className="score-number" style={{ color: 'var(--accent-yellow)' }}>{neutral}%</p>
        <div className="score-bar">
          <div className="score-fill" style={{ width: `${neutral}%`, background: 'var(--accent-yellow)' }} />
        </div>
        <p className="score-hint">Mixed signals</p>
      </div>

    </div>
  );
}

export default SentimentCards;