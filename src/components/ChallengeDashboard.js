import React, { useState } from 'react';
import './ChallengeDashboard.css';

const challenges = [
  {
    id: 1,
    title: 'Challenge 1',
    difficulty: 'Easy',
    status: 'Unlocked',
    description: 'Solve a basic SQL injection vulnerability.',
    url: 'https://example.com/challenge1', // Challenge question link
    correctCode: 'SQL123', // Correct solution for this challenge
  }, 
  {
    id: 2,
    title: 'Challenge 2',
    difficulty: 'Medium',
    status: 'Locked',
    description: 'Explore Cross-Site Scripting (XSS) in a form.',
    url: 'https://example.com/challenge2',
    correctCode: 'XSS456',
  },
  {
    id: 3,
    title: 'Challenge 3',
    difficulty: 'Hard',
    status: 'Locked',
    description: 'Bypass authentication using CSRF techniques.',
    url: 'https://example.com/challenge3',
    correctCode: 'CSRF789',
  },
];

const ChallengeDashboard = () => {
  const [completed, setCompleted] = useState([false, false, false]); // Track completion status
  const [userCodes, setUserCodes] = useState(['', '', '']); // Track user inputs
  const [error, setError] = useState(['', '', '']); // Track error messages

  const handleComplete = (index) => {
    const newCompleted = [...completed];
    newCompleted[index] = true;
    setCompleted(newCompleted);
  };

  const handleCodeChange = (index, value) => {
    const newUserCodes = [...userCodes];
    newUserCodes[index] = value;
    setUserCodes(newUserCodes);
  };

  const handleCodeSubmit = (index) => {
    if (userCodes[index] === challenges[index].correctCode) {
      handleComplete(index);
      setError((prevError) => {
        const newError = [...prevError];
        newError[index] = '';
        return newError;
      });
    } else {
      setError((prevError) => {
        const newError = [...prevError];
        newError[index] = 'Incorrect code. Try again!';
        return newError;
      });
    }
  };

  return (
    <div className="dashboard">
      <h2>CTF Challenge Dashboard</h2>
      <div className="challenge-list">
        {challenges.map((challenge, index) => (
          <div className="challenge-card" key={challenge.id}>
            <h3>{challenge.title}</h3>
            <p>{challenge.description}</p>
            <span className={`difficulty ${challenge.difficulty.toLowerCase()}`}>
              Difficulty: {challenge.difficulty}
            </span>
            <span className="status">
              Status: {completed[index] ? 'Completed' : challenge.status}
            </span>
            <div className="progress-bar">
              <div
                className="progress"
                style={{ width: completed[index] ? '100%' : '0%' }}
              ></div>
            </div>
            <button
              onClick={() => window.open(challenge.url, '_blank')}
              className="get-challenge-button"
            >
              Get Challenge
            </button>
            {!completed[index] && (
              <div className="code-submission">
                <input
                  type="text"
                  placeholder="Enter your solution code"
                  value={userCodes[index]}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                />
                <button onClick={() => handleCodeSubmit(index)}>
                  Submit Code
                </button>
                {error[index] && <p className="error-message">{error[index]}</p>}
              </div>
            )}
            {completed[index] && (
              <p className="success-message">Challenge Completed Successfully!</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChallengeDashboard;
