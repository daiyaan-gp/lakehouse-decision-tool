// src/App.js
import React from 'react';
import Dashboard from './components/Dashboard';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-white text-gray-900">
      <div className="absolute inset-0 bg-white/50 backdrop-blur-sm" />
      <div className="relative z-10 pt-16">
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
