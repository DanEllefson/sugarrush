'use strict';

const mongoose = require('mongoose');

// Create a schema for the generals collection
const generalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  background: {
    type: String,
    required: true
  },
  symbol: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('General', generalSchema);
