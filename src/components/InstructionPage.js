import React from 'react';
import './InstructionPage.css';

const InstructionPage = () => {
  return (
    <div className="instruction-page">
      <h1>How to Participate in CTF Challenges</h1>

      <section className="instruction-section">
        <h2>Step 1: Select a Challenge</h2>
        <p>
          Navigate to the <strong>Challenge Dashboard</strong>. You'll see a list of challenges, each with a title, description, difficulty level, and status.
        </p>
        <p>
          - **Unlocked challenges** are available for you to attempt immediately.<br />
          - **Locked challenges** will unlock once you complete the previous challenges.
        </p>
        <button className="instruction-button" onClick={() => window.location.href = '/challenge-dashboard'}>
          Go to Challenge Dashboard
        </button>
      </section>

      <section className="instruction-section">
        <h2>Step 2: Attempt the Challenge</h2>
        <p>
          Click the <strong>"Get Challenge"</strong> button on the challenge card to open the problem statement and resources in a new tab. Follow the instructions provided to solve the challenge.
        </p>
        <p>
          The challenge might require you to analyze a vulnerability, write a script, or explore the given application. Use your skills and tools to find the solution code.
        </p>
      </section>

      <section className="instruction-section">
        <h2>Step 3: Submit Your Solution Code</h2>
        <p>
          Once you solve the challenge, you'll discover a <strong>solution code</strong>. Return to the Challenge Dashboard and:
        </p>
        <ol>
          <li>Enter the solution code in the input field for the challenge.</li>
          <li>Click the <strong>"Submit Code"</strong> button.</li>
        </ol>
        <p>
          If the code is correct, you'll see a success message, and the challenge will be marked as completed. If the code is incorrect, you'll receive an error message. Review your solution and try again.
        </p>
      </section>

      <section className="instruction-section">
        <h2>Step 4: Unlock Next Challenge</h2>
        <p>
          Completing a challenge will automatically unlock the next challenge if available. Repeat the process to complete all challenges and climb the leaderboard!
        </p>
      </section>

      <section className="instruction-section">
        <h2>Helpful Tips</h2>
        <ul>
          <li>Read the challenge description carefully before starting.</li>
          <li>Use the appropriate tools and techniques based on the challenge type (e.g., SQL injection, XSS, CSRF).</li>
          <li>Take notes while solving the challenge to document your process.</li>
          <li>If you’re stuck, review the resources or revisit the challenge with a fresh perspective.</li>
        </ul>
      </section>

      <button className="instruction-button" onClick={() => window.location.href = '/challenge-dashboard'}>
        Start Challenges Now
      </button>
    </div>
  );
};

export default InstructionPage;
