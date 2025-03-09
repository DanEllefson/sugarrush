'use strict';

const Store = require('../models/store.model');
const mongoose = require('mongoose');

// Retrieve all stores with optional filtering
const getAllStores = async (req, res) => {
  try {
    const query = {};

    // Apply optional filters
    if (req.query.name) {
      query.name = new RegExp(req.query.name, 'i'); // Case-insensitive search
    }
    if (req.query.owner) {
      // Convert string to ObjectId
      if (mongoose.Types.ObjectId.isValid(req.query.owner)) {
        query.owner_id = new mongoose.Types.ObjectId(req.query.owner);
      } else {
        return res.status(400).json({ message: 'Invalid owner_id format' });
      }
    }

    const stores = await Store.find(query);

    if (!stores || stores.length === 0) {
      return res.status(404).json({ message: 'No matching stores found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(stores);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve stores', error: error.message });
  }
};

// Retrieve a single store by ID
const getSingleStore = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: 'ID parameter is required' });
    }

    const store = await Store.findById(req.params.id);
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(store);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve store', error: error.message });
  }
};

// Create a new store
const createSingleStore = async (req, res) => {
  try {
    const store = new Store({
      name: req.body.name,
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      zip_code: req.body.zip_code,
      phone_number: req.body.phone_number,
      email: req.body.email,
      owner_id: req.body.owner_id,
      operating_hours: req.body.operating_hours,
      website: req.body.website
    });

    if (!store) {
      return res.status(400).json({ message: 'Store object is empty' });
    }

    await store.save();
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json({ message: 'New store added', id: store._id });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create store', error: error.message });
  }
};

// Update a single store
const updateSingleStore = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: 'ID parameter is required' });
    }

    const updatedStore = await Store.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedStore) {
      return res.status(404).json({ message: 'Store not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ message: 'Store updated successfully', store: updatedStore });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update store', error: error.message });
  }
};

// Delete a single store
const deleteSingleStore = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: 'ID parameter is required' });
    }

    const store = await Store.findByIdAndDelete(req.params.id);
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ message: 'Store deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete store', error: error.message });
  }
};

module.exports = {
  getAllStores,
  getSingleStore,
  createSingleStore,
  updateSingleStore,
  deleteSingleStore
};
