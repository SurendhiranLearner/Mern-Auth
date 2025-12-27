// Authentication Controller
// Handles register and login logic

const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Helper function to generate JWT token
// Token expires in 7 days
const generateToken = (userId) => {
  return jwt.sign(
    { userId }, // Payload
    process.env.JWT_SECRET, // Secret key
    { expiresIn: '7d' } // Options
  );
};

// REGISTER Controller
// Handles user registration
// POST /api/auth/register
const register = async (req, res) => {
  try {
    // Extract data from request body
    const { name, email, password, confirmPassword } = req.body;

    // Validate all required fields are provided
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, email, password, confirmPassword',
      });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match',
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered. Please login or use a different email.',
      });
    }

    // Create new user document
    // Password will be automatically hashed by mongoose middleware
    const user = new User({
      name,
      email,
      password,
    });

    // Save user to database
    await user.save();

    // Generate JWT token for the new user
    const token = generateToken(user._id);

    // Return success response
    res.status(201).json({
      success: true,
      message: 'User registered successfully!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Register error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error during registration',
      error: error.message,
    });
  }
};

// LOGIN Controller
// Handles user login
// POST /api/auth/login
const login = async (req, res) => {
  try {
    // Extract email and password from request body
    const { email, password } = req.body;

    // Validate both fields are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password',
      });
    }

    // Find user by email and include password field
    // (password is normally excluded from queries)
    const user = await User.findOne({ email }).select('+password');

    // Check if user exists
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Compare entered password with stored hashed password
    const isPasswordCorrect = await user.matchPassword(password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Generate JWT token
    const token = generateToken(user._id);

    // Return success response
    res.status(200).json({
      success: true,
      message: 'Login successful!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error during login',
      error: error.message,
    });
  }
};

// GET CURRENT USER Controller
// Gets the current logged-in user's information
// GET /api/auth/me (requires authentication)
const getCurrentUser = async (req, res) => {
  try {
    // User ID is attached to request by authMiddleware
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Get user error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error fetching user',
      error: error.message,
    });
  }
};

// Export all controllers
module.exports = {
  register,
  login,
  getCurrentUser,
};
