import React, { useState } from 'react';
import './PasswordCrackingChallenge.css';

const PasswordCrackingChallenge = () => {
  const [userInput, setUserInput] = useState('');
  const [message, setMessage] = useState('');
  const correctAnswer = "FLAG{example_password}"; // Replace 'example_password' with the actual cracked password

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userInput === correctAnswer) {
      setMessage('Congratulations! You solved the challenge.');
    } else {
      setMessage('Incorrect! Try again.');
    }
  };

  return (
    <div className="challenge-container">
      <h1>Challenge 2: Password Cracking</h1>
      <p>
        Your task is to crack the hash provided in the file to reveal the flag.
        The answer format should be <strong>FLAG{"{cracked_password}"}</strong>.
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter FLAG{...}"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {message && <p className="challenge-message">{message}</p>}
    </div>
  );
};

export default PasswordCrackingChallenge;
