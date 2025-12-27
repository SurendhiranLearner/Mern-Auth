// Authentication Middleware
// Protects routes by verifying JWT tokens

const jwt = require('jsonwebtoken');

// Middleware to protect routes
// This middleware checks if a valid JWT token is present in the request
const authMiddleware = (req, res, next) => {
  try {
    // Get token from Authorization header
    // Expected format: "Bearer token_here"
    const token = req.headers.authorization?.split(' ')[1];

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided. Please login first.',
      });
    }

    // Verify the token using JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach user ID to request object for use in controllers
    req.userId = decoded.userId;
    
    next();
  } catch (error) {
    // Handle various token errors
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token has expired. Please login again.',
      });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token. Please login again.',
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Authentication failed.',
      error: error.message,
    });
  }
};

module.exports = authMiddleware;
