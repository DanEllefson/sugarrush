'use strict';

// Import the required modules
const express = require('express');
const waveController = require('../controllers/waves');
const wavesValidate = require('../utilities/waves-validation');
const { authenticateJWT, authorizeRoles } = require('../utilities/authentication');
const utilities = require('../utilities/index');

// Create a new router
const router = express.Router();

// Return all waves
router.get('/', utilities.handleErrors(waveController.getAllWaves));

// Return a single wave
router.get(
  '/:id',
  wavesValidate.idRules(),
  wavesValidate.checkId,
  utilities.handleErrors(waveController.getSingleWave)
);

// Delete a single wave (admin only)
router.delete(
  '/:id',
  authenticateJWT,
  authorizeRoles('admin'),
  wavesValidate.idRules(),
  wavesValidate.checkId,
  utilities.handleErrors(waveController.deleteSingleWave)
);

// Create a new wave (admin and developer only)
router.post(
  '/',
  authenticateJWT,
  authorizeRoles('admin', 'developer'),
  wavesValidate.waveAddRules(),
  wavesValidate.checkWave,
  utilities.handleErrors(waveController.createSingleWave)
);

// Update a single wave (admin and developer only)
router.put(
  '/:id',
  authenticateJWT,
  authorizeRoles('admin', 'developer'),
  wavesValidate.idRules(),
  wavesValidate.checkId,
  wavesValidate.waveUpdateRules(),
  wavesValidate.checkWave,
  utilities.handleErrors(waveController.updateSingleWave)
);

module.exports = router;
