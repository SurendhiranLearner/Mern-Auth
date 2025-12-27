// Database Connection Configuration
// This file handles MongoDB connection using Mongoose

const mongoose = require('mongoose');

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // Connect to MongoDB using the URI from environment variables
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✓ MongoDB Connected Successfully');
  } catch (error) {
    console.error('✗ MongoDB Connection Error:', error.message);
    // Exit process with failure code
    process.exit(1);
  }
};

module.exports = connectDB;
