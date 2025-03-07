'use strict';

const mongoose = require('mongoose');

// Create a schema for the glyphs collection
const glyphSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  wave: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Glyph', glyphSchema);
