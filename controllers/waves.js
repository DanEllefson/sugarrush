'use strict';

// Import the required modules
const Wave = require('../models/wave.model');

// Return all waves
const getAllWaves = async (_req, res) => {
  try {
    const waves = await Wave.find();
    if (!waves || waves.length === 0) {
      return res.status(404).json({ message: 'No waves found in database' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(waves);
  } catch (error) {
    res.status(400).json({ message: 'Failed to get waves', error: error.message });
  }
};

// Return a single wave
const getSingleWave = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: 'ID parameter is required' });
    }

    const wave = await Wave.findById(req.params.id);
    if (!wave) {
      return res.status(404).json({ message: 'Wave not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(wave);
  } catch (error) {
    res.status(400).json({ message: 'Failed to get wave', error: error.message });
  }
};

// Create a new wave
const createSingleWave = async (req, res) => {
  try {
    const wave = new Wave({
      name: req.body.name,
      releaseDate: req.body.releaseDate,
      description: req.body.description
    });

    if (!wave) {
      return res.status(400).json({ message: 'Wave object is empty' });
    }

    await wave.save();
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json({ message: 'New wave added', id: wave._id });
  } catch (error) {
    res.status(400).json({ message: 'Failed to create wave', error: error.message });
  }
};

// Delete a single wave
const deleteSingleWave = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: 'ID parameter is required' });
    }

    const wave = await Wave.findByIdAndDelete(req.params.id);
    if (!wave) {
      return res.status(404).json({ message: 'Wave not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ message: 'Wave deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete wave', error: error.message });
  }
};

// Update a single wave
const updateSingleWave = async (req, res) => {
  try {
    const wave = new Wave({
      name: req.body.name,
      releaseDate: req.body.releaseDate,
      description: req.body.description
    });

    if (!wave) {
      return res.status(400).json({ message: 'Wave object is empty' });
    }

    // Convert Wave object to a plain JavaScript object (removes Mongoose features)
    const waveObject = wave.toObject();

    // Remove _id to prevent MongoDB error
    delete waveObject._id;

    // Update the existing army in the database
    const returnWave = await Wave.findByIdAndUpdate(req.params.id, waveObject, {
      new: true,
      runValidators: true
    });

    if (!returnWave) {
      return res.status(404).json({ message: 'Wave not found' });
    }

    res.status(204).json(returnWave);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update wave', error: error.message });
  }
};

module.exports = {
  getAllWaves,
  getSingleWave,
  createSingleWave,
  deleteSingleWave,
  updateSingleWave
};
