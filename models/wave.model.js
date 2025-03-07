'use strict';

const mongoose = require('mongoose');

// Create a schema for the waves collection
const waveSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  releaseDate: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Wave', waveSchema);
