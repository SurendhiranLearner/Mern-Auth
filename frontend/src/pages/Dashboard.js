// Dashboard Page
// Protected page showing user info and logout option

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  // State for user data
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Hook to navigate to different pages
  const navigate = useNavigate();

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        
        // Get current user from API
        const response = await getCurrentUser();
        setUser(response.data.user);
        setError('');
      } catch (err) {
        setError('Failed to fetch user data. Please login again.');
        // Redirect to login after 2 seconds if error
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  // Handle logout
  const handleLogout = () => {
    // Remove token and user data from localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');

    // Redirect to login page
    navigate('/login');
  };

  // Show loading message
  if (loading) {
    return (
      <div className="dashboard-container">
        <p>Loading your profile...</p>
      </div>
    );
  }

  // Show error message
  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error-message">
          <p>✗ {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-box">
        <h1>Welcome to Your Dashboard</h1>

        {/* Success Message */}
        <div className="success-message">
          <p>✓ You are successfully logged in!</p>
        </div>

        {/* User Information */}
        {user && (
          <div className="user-info">
            <h2>Your Profile</h2>
            <div className="info-item">
              <span className="label">Name:</span>
              <span className="value">{user.name}</span>
            </div>
            <div className="info-item">
              <span className="label">Email:</span>
              <span className="value">{user.email}</span>
            </div>
            <div className="info-item">
              <span className="label">User ID:</span>
              <span className="value">{user.id}</span>
            </div>
          </div>
        )}

        {/* Logout Button */}
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
