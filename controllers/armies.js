'use strict';

// Import the required modules
const Army = require('../models/army.model');

// Return all armies
const getAllArmies = async (_req, res) => {
  try {
    const armies = await Army.find();
    if (!armies || armies.length === 0) {
      return res.status(404).json({ message: 'No armies found in database' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(armies);
  } catch (error) {
    res.status(400).json({ message: 'Failed to get armies', error: error.message });
  }
};

// Return a single army
const getSingleArmy = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: 'ID parameter is required' });
    }

    const army = await Army.findById(req.params.id).populate('general').populate('wave');
    if (!army) {
      return res.status(404).json({ message: 'Army not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(army);
  } catch (error) {
    res.status(400).json({ message: 'Failed to get army', error: error.message });
  }
};

// Create a new army
const createSingleArmy = async (req, res) => {
  try {
    const army = new Army({
      name: req.body.name,
      type: req.body.type,
      general: req.body.general,
      attack: req.body.attack,
      defense: req.body.defense,
      move: req.body.move,
      range: req.body.range,
      life: req.body.life,
      cost: req.body.cost,
      specialPowers: req.body.specialPowers,
      class: req.body.class,
      species: req.body.species,
      personality: req.body.personality,
      size: req.body.size,
      height: req.body.height,
      url: req.body.url,
      wave: req.body.wave
    });

    if (!army) {
      return res.status(400).json({ message: 'Army object is empty' });
    }

    await army.save();
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json({ message: 'New army added', id: army._id });
  } catch (error) {
    res.status(400).json({ message: 'Failed to create army', error: error.message });
  }
};

// Delete a single army
const deleteSingleArmy = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: 'ID parameter is required' });
    }

    const army = await Army.findByIdAndDelete(req.params.id);
    if (!army) {
      return res.status(404).json({ message: 'Army not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ message: 'Army deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete army', error: error.message });
  }
};

// Update a single army
const updateSingleArmy = async (req, res) => {
  try {
    const army = new Army({
      name: req.body.name,
      type: req.body.type,
      general: req.body.general,
      attack: req.body.attack,
      defense: req.body.defense,
      move: req.body.move,
      range: req.body.range,
      life: req.body.life,
      cost: req.body.cost,
      specialPowers: req.body.specialPowers,
      class: req.body.class,
      species: req.body.species,
      personality: req.body.personality,
      size: req.body.size,
      height: req.body.height,
      url: req.body.url,
      wave: req.body.wave
    });

    if (!army) {
      return res.status(400).json({ message: 'Army object is empty' });
    }

    // Convert Army object to a plain JavaScript object (removes Mongoose features)
    const armyObject = army.toObject();

    // Remove _id to prevent MongoDB error
    delete armyObject._id;

    // Update the existing army in the database
    const returnArmy = await Army.findByIdAndUpdate(req.params.id, armyObject, {
      new: true,
      runValidators: true
    });

    if (!returnArmy) {
      return res.status(404).json({ message: 'Army not found' });
    }

    res.status(204).json(returnArmy);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update army', error: error.message });
  }
};

module.exports = {
  getAllArmies,
  getSingleArmy,
  createSingleArmy,
  deleteSingleArmy,
  updateSingleArmy
};
