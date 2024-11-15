import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";

const API_URL = "https://ctf-backend-03il.onrender.com";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch profile data on component mount
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found");
        setLoading(false);
        return;
      }

      const response = await axios.get(`${API_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setProfile(response.data);
        setError(null);
      }
    } catch (err) {
      console.error("Profile fetch error:", err);
      setError(err.response?.data?.message || "Failed to fetch profile data");
      if (err.response?.status === 401) {
        // Handle unauthorized access and redirect to login
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    } finally {
      setLoading(false);
    }
  };

  // Toggle edit mode for profile
  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  // Handle input change when editing profile
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Handle saving profile changes
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found");
        return;
      }

      await axios.put(
        `${API_URL}/profile`,
        { email: profile.email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setEditMode(false);
      await fetchProfile(); // Re-fetch updated profile
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Error updating profile");
    }
  };

  // Handle navigation to challenge dashboard
  const handleGoToChallenges = () => {
    navigate("/challenge-dashboard");
  };

  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="profile-container">
        <div className="error-message">No profile data available</div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      {error && <div className="error-message">{error}</div>}
      <div className="profile-info">
        <label>Username:</label>
        <p>{profile.username}</p>
      </div>
      <div className="profile-info">
        <label>Email:</label>
        {editMode ? (
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
          />
        ) : (
          <p>{profile.email}</p>
        )}
      </div>
      <div className="profile-info">
        <label>Challenges Completed:</label>
        <p>{profile.challengesCompleted}</p>
      </div>
      <div className="profile-info">
        <label>Points:</label>
        <p>{profile.points}</p>
      </div>
      <div className="profile-info">
        <label>Rank:</label>
        <p>{profile.rank}</p>
      </div>

      <div className="profile-buttons">
        {editMode ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <button onClick={handleEditToggle}>Edit Profile</button>
        )}
      </div>

      <div className="profile-buttons">
        <button onClick={handleGoToChallenges} className="challenge-button">
          Go to Challenges
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
