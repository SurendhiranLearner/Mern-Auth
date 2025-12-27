// User Model Schema
// Defines the structure of user documents in MongoDB

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Create User Schema
const userSchema = new mongoose.Schema({
  // User's full name (required)
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
  },
  
  // User's email address (required and unique)
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email',
    ],
  },
  
  // User's password (hashed, required)
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password must be at least 6 characters long'],
    select: false, // Don't include password by default in queries
  },
  
  // Timestamp for when user was created
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to hash password before saving
// This runs automatically before saving to database
userSchema.pre('save', async function (next) {
  // Skip hashing if password hasn't been modified
  if (!this.isModified('password')) {
    return next();
  }

  try {
    // Generate salt (rounds = 10)
    const salt = await bcrypt.genSalt(10);
    
    // Hash the password with the salt
    this.password = await bcrypt.hash(this.password, salt);
    
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare entered password with hashed password
// Used during login to verify credentials
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create and export User model
module.exports = mongoose.model('User', userSchema);
