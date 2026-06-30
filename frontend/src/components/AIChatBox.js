import React, { useState, useRef, useEffect } from 'react';
import './AIChatBox.css';

function AIChatBox({ company }) {
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      text: `Hi! I have analysed the latest news about ${company}. Ask me anything — like "What are the key risks?" or "Is sentiment improving?"`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || isTyping) return;

    const userMsg = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'ai',
          text: `Based on recent news about ${company}, the sentiment appears mixed. This is mock data — real AI answers will come after backend is connected!`,
        },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  const suggestions = [
    `What are the key risks for ${company}?`,
    'Is sentiment improving or declining?',
    'What are analysts saying?',
  ];

  return (
    <div className="chatbox-card">
      <div className="chatbox-header">
        <span className="chatbox-icon">🤖</span>
        <div>
          <h3 className="chatbox-title">Ask AI about {company}</h3>
        <p className="chatbox-subtitle">MarketPulse AI · Powered by Gemini</p>
        </div>
      </div>

      <div className="suggestions">
        {suggestions.map((s, i) => (
          <button key={i} className="suggestion-btn" onClick={() => setInput(s)}>
            {s}
          </button>
        ))}
      </div>

      <div className="messages-area">
        {messages.map((msg, i) => (
          <div key={i} className={`message message-${msg.role}`}>
            {msg.role === 'ai' && <span className="msg-avatar">🤖</span>}
            <div className="msg-bubble">{msg.text}</div>
            {msg.role === 'user' && <span className="msg-avatar">👤</span>}
          </div>
        ))}
        {isTyping && (
          <div className="message message-ai">
            <span className="msg-avatar">🤖</span>
            <div className="msg-bubble typing">
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="chat-input-row">
        <input
          className="chat-input"
          type="text"
          placeholder="Ask anything about this stock..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          disabled={isTyping}
        />
        <button className="chat-send-btn" onClick={handleSend} disabled={isTyping || !input.trim()}>
          Send ↗
        </button>
      </div>
    </div>
  );
}

export default AIChatBox;