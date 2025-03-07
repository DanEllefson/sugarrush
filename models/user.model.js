'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  preferred_name: { type: String, default: '' },
  role: {
    type: String,
    enum: ['user', 'developer', 'admin'],
    default: 'user'
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
