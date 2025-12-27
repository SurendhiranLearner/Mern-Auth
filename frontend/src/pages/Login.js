// Login Page
// User login form

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/api';
import './Auth.css';

const Login = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // State for success/error messages
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const [loading, setLoading] = useState(false);

  // Hook to navigate to different pages
  const navigate = useNavigate();

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    // Validate form inputs
    if (!formData.email.includes('@')) {
      setMessageType('error');
      setMessage('Please enter a valid email');
      return;
    }

    if (!formData.password) {
      setMessageType('error');
      setMessage('Password is required');
      return;
    }

    try {
      setLoading(true);

      // Call login API
      const response = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      // Save token to localStorage
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('userName', response.data.user.name);
      }

      // Show success message
      setMessageType('success');
      setMessage('Login successful! Redirecting...');

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      // Handle errors
      setMessageType('error');
      setMessage(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>Login to Your Account</h1>

        {/* Success or Error Message */}
        {message && (
          <div className={`message ${messageType}`}>
            {messageType === 'success' ? '✓' : '✗'} {message}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              disabled={loading}
              required
            />
          </div>

          {/* Password Input */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              disabled={loading}
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" disabled={loading} className="btn">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Link to Register Page */}
        <p className="auth-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
