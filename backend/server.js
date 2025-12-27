// Main Server File
// Entry point for the Express backend application

// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
// Enable CORS (allows frontend to make requests to backend)
// Enable CORS (allows frontend to make requests to backend)
// Support comma-separated origins in CORS_ORIGIN env var (e.g. "http://localhost:3000,https://your-frontend.vercel.app")
const rawCors = process.env.CORS_ORIGIN || 'http://localhost:3000';
const allowedOrigins = Array.isArray(rawCors)
  ? rawCors
  : rawCors.split(',').map((u) => u.trim()).filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser tools (no origin) like curl/postman
      if (!origin) return callback(null, true);

      // Allow if origin is in configured list
      if (allowedOrigins.indexOf(origin) !== -1) {
        return callback(null, true);
      }

      // Otherwise block
      return callback(new Error('Not allowed by CORS'), false);
    },
    credentials: true,
  })
);

// Parse incoming JSON requests
app.use(express.json());

// Parse incoming URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Routes
// All authentication routes start with /api/auth
app.use('/api/auth', authRoutes);

// Root route (for testing if server is running)
app.get('/', (req, res) => {
  res.json({
    message: 'MERN Auth API is running',
    version: '1.0.0',
  });
});

// 404 route (handles undefined routes)
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handling middleware
// Catches any errors thrown in the app
app.use((err, req, res, next) => {
  console.error('Server error:', err.message);
  res.status(500).json({
    success: false,
    message: 'Server error',
    error: err.message,
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n✓ Server is running on http://localhost:${PORT}`);
  console.log(`✓ CORS enabled for: ${process.env.CORS_ORIGIN || 'http://localhost:3000'}`);
  console.log(`✓ MongoDB URI: ${process.env.MONGO_URI}`);
  console.log('\nEndpoints:');
  console.log('  POST   /api/auth/register - Register new user');
  console.log('  POST   /api/auth/login    - Login user');
  console.log('  GET    /api/auth/me       - Get current user (protected)');
  console.log('\n');
});
