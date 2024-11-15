import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css";

const API_URL = "https://ctf-backend-03il.onrender.com"; // Backend API URL

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message before submitting

    try {
      const response = await axios.post(
        `${API_URL}/login`, // API endpoint for login
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );

      // Store JWT token and username in local storage upon successful login
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("username", response.data.username);

      // Navigate to dashboard after login success
      navigate("/dashboard");
    } catch (err) {
      // Handle errors based on the response
      if (err.response) {
        setError(err.response.data.message || "Invalid credentials");
      } else if (err.request) {
        setError("Server is not responding. Please try again later.");
      } else {
        setError("An error occurred during login.");
      }
      console.error("Login error:", err);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>} {/* Display error if any */}

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-button">Login</button>
      </form>

      <div className="signup-link">
        Don't have an account? <a href="/signup">Sign up</a>
      </div>
    </div>
  );
};

export default LoginPage;
