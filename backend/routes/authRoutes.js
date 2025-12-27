// Authentication Routes
// Defines all auth-related endpoints

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// POST /api/auth/register
// Public route - Register a new user
router.post('/register', authController.register);

// POST /api/auth/login
// Public route - Login a user
router.post('/login', authController.login);

// GET /api/auth/me
// Protected route - Get current user info
// Requires valid JWT token in Authorization header
router.get('/me', authMiddleware, authController.getCurrentUser);

module.exports = router;
