'use strict';

// Import the required modules
const Glyph = require('../models/glyph.model');

// Return all glyphs
const getAllGlyphs = async (_req, res) => {
  try {
    const glyphs = await Glyph.find();
    if (!glyphs || glyphs.length === 0) {
      return res.status(404).json({ message: 'No glyphs found in database' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(glyphs);
  } catch (error) {
    res.status(400).json({ message: 'Failed to get glyphs', error: error.message });
  }
};

// Return a single glyph
const getSingleGlyph = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: 'ID parameter is required' });
    }

    const glyph = await Glyph.findById(req.params.id);
    if (!glyph) {
      return res.status(404).json({ message: 'Glyph not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(glyph);
  } catch (error) {
    res.status(400).json({ message: 'Failed to get glyph', error: error.message });
  }
};

// Create a new glyph
const createSingleGlyph = async (req, res) => {
  try {
    const glyph = new Glyph({
      name: req.body.name,
      wave: req.body.wave,
      summary: req.body.summary,
      description: req.body.description
    });

    if (!glyph) {
      return res.status(400).json({ message: 'Glyph object is empty' });
    }

    await glyph.save();
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json({ message: 'New glyph added', id: glyph._id });
  } catch (error) {
    res.status(400).json({ message: 'Failed to create glyph', error: error.message });
  }
};

// Delete a single glyph
const deleteSingleGlyph = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: 'ID parameter is required' });
    }

    const glyph = await Glyph.findByIdAndDelete(req.params.id);
    if (!glyph) {
      return res.status(404).json({ message: 'Glyph not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ message: 'Glyph deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete glyph', error: error.message });
  }
};

// Update a single glyph
const updateSingleGlyph = async (req, res) => {
  try {
    const glyph = new Glyph({
      name: req.body.name,
      wave: req.body.wave,
      summary: req.body.summary,
      description: req.body.description
    });

    if (!glyph) {
      return res.status(400).json({ message: 'Glyph object is empty' });
    }

    // Convert Glyph object to a plain JavaScript object (removes Mongoose features)
    const glyphObject = glyph.toObject();

    // Remove _id to prevent MongoDB error
    delete glyphObject._id;

    // Update the existing army in the database
    const returnGlyph = await Glyph.findByIdAndUpdate(req.params.id, glyphObject, {
      new: true,
      runValidators: true
    });

    if (!returnGlyph) {
      return res.status(404).json({ message: 'Glyph not found' });
    }

    res.status(204).json(returnGlyph);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update glyph', error: error.message });
  }
};

module.exports = {
  getAllGlyphs,
  getSingleGlyph,
  createSingleGlyph,
  deleteSingleGlyph,
  updateSingleGlyph
};
