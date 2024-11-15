import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CountdownPage.css';

const CountdownPage = () => {
  const navigate = useNavigate();
  const totalSeconds = 30 * 60; // 30 minutes in seconds
  const speedMultiplier = 1.5; // 1.5x speed
  const [timeLeft, setTimeLeft] = useState(totalSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000 / speedMultiplier);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      navigate('/challenge-dashboard'); // Redirect to the challenge page
    }
  }, [timeLeft, navigate]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <div className="countdown-page">
      <h1>Get Ready for the Challenge!</h1>
      <p>The challenge will start in:</p>
      <div className="countdown-timer">
        <h2>{formatTime(timeLeft)}</h2>
      </div>
      <p>Please wait while the timer counts down.</p>
    </div>
  );
};

export default CountdownPage;
