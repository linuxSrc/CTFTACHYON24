import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import ResetPassword from './components/ResetPassword';
import Signup from './components/Signup';
import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';
import ChallengeDashboard from './components/ChallengeDashboard';
import InstructionPage from './components/InstructionPage'; // Importing InstructionPage

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
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/challenge-dashboard">Challenges</Link></li>
            <li><Link to="/instructions">How to Play</Link></li> {/* Adding link for instructions */}
          </ul>
        </nav>

        <div className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/challenge-dashboard" element={<ChallengeDashboard />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/instructions" element={<InstructionPage />} /> {/* Adding route for InstructionPage */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
