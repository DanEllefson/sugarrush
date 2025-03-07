'use strict';

// Import the required modules
const express = require('express');
const generalsController = require('../controllers/generals');
const generalsValidate = require('../utilities/generals-validation');
const { authenticateJWT, authorizeRoles } = require('../utilities/authentication');
const utilities = require('../utilities/index');

// Create a new router
const router = express.Router();

// Return all generals
router.get('/', utilities.handleErrors(generalsController.getAllGenerals));

// Return a single general
router.get(
  '/:id',
  generalsValidate.idRules(),
  generalsValidate.checkId,
  utilities.handleErrors(generalsController.getSingleGeneral)
);

// Delete a single general (admin only)
router.delete(
  '/:id',
  authenticateJWT,
  authorizeRoles('admin'),
  generalsValidate.idRules(),
  generalsValidate.checkId,
  utilities.handleErrors(generalsController.deleteSingleGeneral)
);

// Create a new general (admin and developer only)
router.post(
  '/',
  authenticateJWT,
  authorizeRoles('admin', 'developer'),
  generalsValidate.generalAddRules(),
  generalsValidate.checkGeneral,
  utilities.handleErrors(generalsController.createSingleGeneral)
);

// Update a single general (admin and developer only)
router.put(
  '/:id',
  authenticateJWT,
  authorizeRoles('admin', 'developer'),
  generalsValidate.idRules(),
  generalsValidate.checkId,
  generalsValidate.generalUpdateRules(),
  generalsValidate.checkGeneral,
  utilities.handleErrors(generalsController.updateSingleGeneral)
);

module.exports = router;
