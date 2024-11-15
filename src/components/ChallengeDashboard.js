// frontend/src/ChallengeDashboard.js

import React, { useState } from "react";
import "./ChallengeDashboard.css";
import axios from "axios";

const challenges = [
  {
    id: 1,
    title: "Challenge 1",
    difficulty: "Easy",
    status: "Unlocked",
    description: "Solve a basic SQL injection vulnerability.",
    url: "https://example.com/challenge1", // Challenge question link
  },
  {
    id: 2,
    title: "Challenge 2",
    difficulty: "Medium",
    status: "Locked",
    description: "Explore Cross-Site Scripting (XSS) in a form.",
    url: "https://example.com/challenge2",
  },
  {
    id: 3,
    title: "Challenge 3",
    difficulty: "Hard",
    status: "Locked",
    description: "Bypass authentication using CSRF techniques.",
    url: "https://example.com/challenge3",
  },
];

const ChallengeDashboard = () => {
  const [completed, setCompleted] = useState([false, false, false]); // Track completion status
  const [userFlags, setUserFlags] = useState(["", "", ""]); // Track user inputs
  const [error, setError] = useState(["", "", ""]); // Track error messages

  const handleComplete = (index) => {
    const newCompleted = [...completed];
    newCompleted[index] = true;
    setCompleted(newCompleted);
  };

  const handleFlagChange = (index, value) => {
    const newUserFlags = [...userFlags];
    newUserFlags[index] = value;
    setUserFlags(newUserFlags);
  };

  const handleFlagSubmit = async (index) => {
    try {
      const token = localStorage.getItem("access_token"); // Assuming token is stored in localStorage
      const response = await axios.post(
        `/submit-flag/${challenges[index].id}`,
        { flag: userFlags[index] },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.message === "Correct flag! Score updated.") {
        handleComplete(index);
        setError((prevError) => {
          const newError = [...prevError];
          newError[index] = "";
          return newError;
        });
      }
    } catch (err) {
      setError((prevError) => {
        const newError = [...prevError];
        newError[index] = err.response?.data?.message || "Submission failed";
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
            <span
              className={`difficulty ${challenge.difficulty.toLowerCase()}`}
            >
              Difficulty: {challenge.difficulty}
            </span>
            <span className="status">
              Status: {completed[index] ? "Completed" : challenge.status}
            </span>
            <div className="progress-bar">
              <div
                className="progress"
                style={{ width: completed[index] ? "100%" : "0%" }}
              ></div>
            </div>
            <button
              onClick={() => window.open(challenge.url, "_blank")}
              className="get-challenge-button"
            >
              Get Challenge
            </button>
            {!completed[index] && (
              <div className="flag-submission">
                <input
                  type="text"
                  placeholder="Enter your flag"
                  value={userFlags[index]}
                  onChange={(e) => handleFlagChange(index, e.target.value)}
                />
                <button onClick={() => handleFlagSubmit(index)}>
                  Submit Flag
                </button>
                {error[index] && (
                  <p className="error-message">{error[index]}</p>
                )}
              </div>
            )}
            {completed[index] && (
              <p className="success-message">
                Challenge Completed Successfully!
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChallengeDashboard;
