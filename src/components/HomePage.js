import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleJoinNow = () => {
    navigate('/signup');
  };

  return (
    <div className="home-container">
      <div className="overlay">
        <nav className="navbar">
          <div className="navbar-content">
            <div className="logo">BOTNET</div>
            <ul className={`navbar-links ${menuOpen ? 'navbar-links-visible' : ''}`}>
              <li><a href="/">Home</a></li>
              <li><a href="/login">Login</a></li>
              <li><a href="/signup">Sign Up</a></li>
            </ul>
            <div className="hamburger" onClick={toggleMenu}>
              &#9776; {/* Hamburger icon */}
            </div>
          </div>
        </nav>

        <div className="home-content">
          <h1>Welcome to CHAKARAVYUH-1.0 CTF</h1>
          <p>"Unravel the layers, conquer the challenge!"</p>
          
          <div className="info-box">
            <h4>
              Chakravyuh-1.0 is a Cyber Security Capture the Flag (CTF) event inspired by Naruto. 
              This challenge tests participants in web security, cryptography, and system vulnerabilities.
              Compete as a cyber shinobi, solve unique challenges, and unlock your hidden potential in this 
              thrilling, puzzle-based cybersecurity showdown!
            </h4>
            <button className="cta-button" onClick={handleJoinNow}>
              Join Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
