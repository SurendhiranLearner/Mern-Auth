// Register Page
// User registration form with validation

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/api';
import './Auth.css';

const Register = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
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
    if (!formData.name.trim()) {
      setMessageType('error');
      setMessage('Name is required');
      return;
    }

    if (!formData.email.includes('@')) {
      setMessageType('error');
      setMessage('Please enter a valid email');
      return;
    }

    if (formData.password.length < 6) {
      setMessageType('error');
      setMessage('Password must be at least 6 characters');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessageType('error');
      setMessage('Passwords do not match');
      return;
    }

    try {
      setLoading(true);

      // Call register API
      const response = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });

      // Save token to localStorage
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('userName', response.data.user.name);
      }

      // Show success message
      setMessageType('success');
      setMessage('Registration successful! Redirecting...');

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      // Handle errors
      setMessageType('error');
      setMessage(
        error.response?.data?.message || 'Registration failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>Create Account</h1>

        {/* Success or Error Message */}
        {message && (
          <div className={`message ${messageType}`}>
            {messageType === 'success' ? '✓' : '✗'} {message}
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              disabled={loading}
              required
            />
          </div>

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
              placeholder="At least 6 characters"
              disabled={loading}
              required
            />
          </div>

          {/* Confirm Password Input */}
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              disabled={loading}
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" disabled={loading} className="btn">
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        {/* Link to Login Page */}
        <p className="auth-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
