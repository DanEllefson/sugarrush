'use strict';

// Import the required modules
const express = require('express');
const armiesController = require('../controllers/armies');
const armiesValidate = require('../utilities/armies-validation');
const { authenticateJWT, authorizeRoles } = require('../utilities/authentication');
const utilities = require('../utilities/index');

// Create a new router
const router = express.Router();

// Return all armies
router.get('/', utilities.handleErrors(armiesController.getAllArmies));

// Return a single army
router.get(
  '/:id',
  armiesValidate.idRules(),
  armiesValidate.checkId,
  utilities.handleErrors(armiesController.getSingleArmy)
);

// Delete a single army (admin only)
router.delete(
  '/:id',
  authenticateJWT,
  authorizeRoles('admin'),
  armiesValidate.idRules(),
  armiesValidate.checkId,
  utilities.handleErrors(armiesController.deleteSingleArmy)
);

// Create a new army (admin and developer only)
router.post(
  '/',
  authenticateJWT,
  authorizeRoles('admin', 'developer'),
  armiesValidate.armyAddRules(),
  armiesValidate.checkArmy,
  utilities.handleErrors(armiesController.createSingleArmy)
);

// Update a single army (admin and developer only)
router.put(
  '/:id',
  authenticateJWT,
  authorizeRoles('admin', 'developer'),
  armiesValidate.idRules(),
  armiesValidate.checkId,
  armiesValidate.armyUpdateRules(),
  armiesValidate.checkArmy,
  utilities.handleErrors(armiesController.updateSingleArmy)
);

module.exports = router;
