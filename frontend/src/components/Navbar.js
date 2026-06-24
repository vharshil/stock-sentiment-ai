import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">

        <div className="navbar-brand">
          <span className="brand-icon">📈</span>
          <span className="brand-name">
            StockSense<span className="brand-ai"> AI</span>
          </span>
        </div>

        <div className="navbar-links">
          <span className="nav-badge">Free · No signup needed</span>
          <a href="https://github.com/vharshil/stock-sentiment-ai" target="_blank" rel="noopener noreferrer" className="nav-github">
            GitHub
          </a>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;