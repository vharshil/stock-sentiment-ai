
import React from 'react';
import './App.css';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">

      {/* Navbar appears at top of every page */}
      <Navbar />

      
      <h1 style={{ color: 'white', textAlign: 'center', paddingTop: '100px' }}>
        StockSense AI is coming soon 🚀
      </h1>

    </div>
  );
}

export default App;