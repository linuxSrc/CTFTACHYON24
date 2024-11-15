import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import Signup from './components/Signup';
import LoginPage from './components/LoginPage';
import ChallengeDashboard from './components/ChallengeDashboard';
import PasswordCrackingChallenge from './components/PasswordCrackingChallenge';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/challenge-dashboard">Challenges</Link></li>
          </ul>
        </nav>

        <div className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/challenge-dashboard" element={<ChallengeDashboard />} />
            <Route path="/challenge/password-cracking" element={<PasswordCrackingChallenge />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
