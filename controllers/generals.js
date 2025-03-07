'use strict';

// Import the required modules
const General = require('../models/general.model');

// Return all generals
const getAllGenerals = async (_req, res) => {
  try {
    const generals = await General.find();
    if (!generals || generals.length === 0) {
      return res.status(404).json({ message: 'No generals found in database' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(generals);
  } catch (error) {
    res.status(400).json({ message: 'Failed to get generals', error: error.message });
  }
};

// Return a single general
const getSingleGeneral = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: 'ID parameter is required' });
    }

    const general = await General.findById(req.params.id);
    if (!general) {
      return res.status(404).json({ message: 'General not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(general);
  } catch (error) {
    res.status(400).json({ message: 'Failed to get general', error: error.message });
  }
};

// Create a new general
const createSingleGeneral = async (req, res) => {
  try {
    const general = new General({
      name: req.body.name,
      background: req.body.background,
      symbol: req.body.symbol
    });

    if (!general) {
      return res.status(400).json({ message: 'General object is empty' });
    }

    await general.save();
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json({ message: 'New general added', id: general._id });
  } catch (error) {
    res.status(400).json({ message: 'Failed to create general', error: error.message });
  }
};

// Delete a single general
const deleteSingleGeneral = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: 'ID parameter is required' });
    }

    const general = await General.findByIdAndDelete(req.params.id);
    if (!general) {
      return res.status(404).json({ message: 'General not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ message: 'General deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete general', error: error.message });
  }
};

// Update a single general
const updateSingleGeneral = async (req, res) => {
  try {
    const general = new General({
      name: req.body.name,
      background: req.body.background,
      symbol: req.body.symbol
    });

    if (!general) {
      return res.status(400).json({ message: 'General object is empty' });
    }

    // Convert General object to a plain JavaScript object (removes Mongoose features)
    const generalObject = general.toObject();

    // Remove _id to prevent MongoDB error
    delete generalObject._id;

    // Update the existing army in the database
    const returnGeneral = await General.findByIdAndUpdate(req.params.id, generalObject, {
      new: true,
      runValidators: true
    });

    if (!returnGeneral) {
      return res.status(404).json({ message: 'General not found' });
    }

    res.status(204).json(returnGeneral);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update general', error: error.message });
  }
};

module.exports = {
  getAllGenerals,
  getSingleGeneral,
  createSingleGeneral,
  deleteSingleGeneral,
  updateSingleGeneral
};
