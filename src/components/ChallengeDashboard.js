import React, { useState, useEffect } from "react";
import "./ChallengeDashboard.css";
import axios from "axios";

const challenges = [
  {
    id: 1,
    title: 'Challenge 1',
    difficulty: 'Easy',
    status: 'Unlocked',
    description: 'Solve a basic SQL injection vulnerability.',
    url: 'https://frontend-ec0.pages.dev/', // Internal route for this challenge
    correctCode: 'youfoundtheflag739',
  },
  {
    id: 2,
    title: "Challenge 2",
    difficulty: "Medium",
    status: "Locked",
    description: "Explore Cross-Site Scripting (XSS) in a form.",
    url: "https://example.com/challenge2",
    flag: "FLAG{pass#123}",
    score: 200,
  },
  {
    id: 3,
    title: "Challenge 3",
    difficulty: "Hard",
    status: "Locked",
    description: "Bypass authentication using CSRF techniques.",
    url: "https://example.com/challenge3",
    flag: "FLAG{chhin_tapak_dam_dam}",
    score: 300,
  },
];

const ChallengeDashboard = () => {
  const [completed, setCompleted] = useState([false, false, false]);
  const [flags, setFlags] = useState(["", "", ""]);
  const [message, setMessage] = useState(["", "", ""]);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const res = await axios.get("/leaderboard");
      setLeaderboard(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleComplete = (index) => {
    const newCompleted = [...completed];
    newCompleted[index] = true;
    setCompleted(newCompleted);
    fetchLeaderboard();
  };

  const handleFlagChange = (index, value) => {
    const newFlags = [...flags];
    newFlags[index] = value;
    setFlags(newFlags);
  };

  const handleFlagSubmit = async (index) => {
    try {
      const token = localStorage.getItem("access_token"); // Assuming JWT is stored here
      const res = await axios.post(
        "/submit-flag",
        {
          challenge_id: challenges[index].id,
          flag: flags[index],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage((prev) => {
        const newMsg = [...prev];
        newMsg[index] = res.data.message;
        return newMsg;
      });

      if (res.data.message === "Correct flag! Score updated.") {
        handleComplete(index);
      }
    } catch (err) {
      setMessage((prev) => {
        const newMsg = [...prev];
        newMsg[index] = err.response?.data?.message || "Error submitting flag.";
        return newMsg;
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
                  value={flags[index]}
                  onChange={(e) => handleFlagChange(index, e.target.value)}
                />
                <button onClick={() => handleFlagSubmit(index)}>
                  Submit Flag
                </button>
                {message[index] && <p className="message">{message[index]}</p>}
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
      <div className="leaderboard">
        <h3>Leaderboard</h3>
        <ul>
          {leaderboard.map((user, idx) => (
            <li key={idx}>
              {user.username} - {user.solvedChallenges} Solved - {user.score}{" "}
              Points
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChallengeDashboard;
