'use strict';

// Import the required modules
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create a schema for the armies collection
const armySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  general: {
    type: Schema.Types.ObjectId,
    ref: 'General',
    required: true
  },
  attack: {
    type: Number,
    required: true
  },
  defense: {
    type: Number,
    required: true
  },
  move: {
    type: Number,
    required: true
  },
  range: {
    type: Number,
    required: true
  },
  life: {
    type: Number,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  specialPowers: {
    type: String,
    required: true
  },
  class: {
    type: String,
    required: true
  },
  species: {
    type: String,
    required: true
  },
  personality: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  wave: {
    type: Schema.Types.ObjectId,
    ref: 'Wave',
    required: true
  }
});

// Export the model
module.exports = mongoose.model('Army', armySchema);
