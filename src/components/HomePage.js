// src/components/HomePage.js
import React, { useState } from 'react';
import './HomePage.css';

const HomePage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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
          <img src="./images/image.png" alt="CTF Challenge" className="ctf-image" />
          <div className="info-box">
            <h2>About the Challenge</h2>
            <p>This CTF event will test your skills in various cybersecurity areas.</p>
            <button className="cta-button">
              <a href="/signup">Join Now</a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
