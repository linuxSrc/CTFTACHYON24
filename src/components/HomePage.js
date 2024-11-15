import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FlashMessage from './FlashMessage';  // Importing the FlashMessage component
import './HomePage.css';

const HomePage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();

  // Toggling the mobile menu for the navbar
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Navigate to signup page when 'Join Now' is clicked
  const handleJoinNow = () => {
    navigate('/signup');
  };

  // Logic for showing the flash message based on the event time
  useEffect(() => {
    const today = new Date();
    const currentHour = today.getHours();
    const eventTime = 14; // Set event time to 2 PM (14:00)

    if (currentHour >= eventTime) {
      setShowMessage(true);
    }
  }, []);

  const handleCloseMessage = () => {
    setShowMessage(false);
  };

  return (
    <div className="home-container">
      <div className="overlay">
        {/* Flash Message Component */}
        <FlashMessage
          message="The CTF event has been postponed until tomorrow at the same time."
          isVisible={showMessage}
          onClose={handleCloseMessage}
        />
        
        {/* Navbar */}
        <nav className="navbar">
          <div className="navbar-content">
            <div className="logo">BOTNET</div>
            <ul className={`navbar-links ${menuOpen ? 'navbar-links-visible' : ''}`}>
              <li><a href="/">Home</a></li>
              <li><a href="/login">Login</a></li>
              <li><a href="/signup">SignUp</a></li>
            </ul>
            <div className="hamburger" onClick={toggleMenu}>
              &#9776; {/* Hamburger icon */}
            </div>
          </div>
        </nav>

        {/* Home Page Content */}
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
