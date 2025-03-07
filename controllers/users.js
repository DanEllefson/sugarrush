'use strict';

const User = require('../models/user.model');
const redisClient = require('../utilities/redisClient');
const axios = require('axios');
const jwt = require('jsonwebtoken');

// Return all users if logged in as an admin, or return the current user
const getAllUsers = async (req, res) => {
  try {
    let users = await User.find();
    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'No users found in database' });
    }

    // Only admins can see all users. Regular users can only see themselves.
    if (req.user.role !== 'admin') {
      const userIndex = users.findIndex((user) => user._id.toString() === req.user.userId);
      users = users.slice(userIndex, userIndex + 1);
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ message: 'Error getting users', error: err.message });
  }
};

// Return any single user if logged in as an admin or the user themselves
const getSingleUser = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: 'ID parameter is required' });
    }

    // Only admins can see all users. Regular users can only see themselves.
    if (req.user.role !== 'admin' && req.user.userId !== req.params.id) {
      return res.status(403).json({ message: 'Only the user or admin can view the selected user' });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: 'Error getting user', error: err.message });
  }
};

// Delete a single user (only accessible by the user or admin)
const deleteSingleUser = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: 'ID parameter is required' });
    }

    if (req.user.role !== 'admin' && req.user.userId !== req.params.id) {
      return res
        .status(403)
        .json({ message: 'Only the user or admin can delete the selected user' });
    }

    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete user', error: error.message });
  }
};

// Update user info (only accessible by the user or admin)
const updateSingleUser = async (req, res) => {
  const { preferred_name, role } = req.body;

  try {
    if (!req.params.id) {
      return res.status(400).json({ message: 'ID parameter is required' });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Only admins can update roles
    if (role && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can update roles' });
    }

    // Only the user or an admin can update the preferred name
    if (preferred_name && req.user.role !== 'admin' && req.user.userId !== user._id.toString()) {
      return res
        .status(403)
        .json({ message: 'Only the user or an admin can update the preferred name' });
    }

    if (preferred_name) user.preferred_name = preferred_name;
    if (role) user.role = role;

    await user.save();
    res.json({ message: 'User updated successfully', user });
  } catch (err) {
    res.status(400).json({ message: 'Error updating user', error: err.message });
  }
};

// Logout the user and revoke the Google token
const userLogout = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(400).json({ message: 'Authorization header missing.' });
  }

  const token = authHeader.split(' ')[1]; // Extract JWT
  const googleToken = req.user?.googleAccessToken;

  try {
    // Revoke the Google OAuth token
    if (googleToken) {
      await axios.post(`https://oauth2.googleapis.com/revoke?token=${googleToken}`, null, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      console.log('Google access token revoked.');
    } else {
      console.warn('No Google access token found to revoke.');
    }

    // Blacklist the JWT
    const decoded = jwt.decode(token);
    if (!decoded) {
      return res.status(400).json({ message: 'Invalid JWT provided.' });
    }

    const expiresIn = decoded.exp - Math.floor(Date.now() / 1000); // Seconds until JWT expires

    if (expiresIn > 0) {
      await redisClient.set(token, 'blacklisted', { EX: expiresIn });
      console.log(`JWT blacklisted for ${expiresIn} seconds.`);
    } else {
      console.warn('JWT already expired.');
    }

    return res.status(200).json({
      message: 'User logged out successfully. JWT blacklisted and Google token revoked.'
    });
  } catch (err) {
    console.error('Logout error:', err.response?.data || err.message);
    return res.status(500).json({ message: 'Error logging out.' });
  }
};

module.exports = { updateSingleUser, getAllUsers, getSingleUser, deleteSingleUser, userLogout };
