// Protected Route Component
// Wraps routes that require authentication
// Redirects unauthenticated users to login page

import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check if user has authentication token
  const token = localStorage.getItem('authToken');

  // If no token, redirect to login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If token exists, render the protected component
  return children;
};

export default ProtectedRoute;
