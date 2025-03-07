'use strict';

// Import the required modules
const express = require('express');
const glyphController = require('../controllers/glyphs');
const glyphsValidate = require('../utilities/glyphs-validation');
const { authenticateJWT, authorizeRoles } = require('../utilities/authentication');
const utilities = require('../utilities/index');

// Create a new router
const router = express.Router();

// Return all glyphs
router.get('/', utilities.handleErrors(glyphController.getAllGlyphs));

// Return a single glyph
router.get(
  '/:id',
  glyphsValidate.idRules(),
  glyphsValidate.checkId,
  utilities.handleErrors(glyphController.getSingleGlyph)
);

// Delete a single glyph (admin only)
router.delete(
  '/:id',
  authenticateJWT,
  authorizeRoles('admin'),
  glyphsValidate.idRules(),
  glyphsValidate.checkId,
  utilities.handleErrors(glyphController.deleteSingleGlyph)
);

// Create a new glyph (admin and developer only)
router.post(
  '/',
  authenticateJWT,
  authorizeRoles('admin', 'developer'),
  glyphsValidate.glyphAddRules(),
  glyphsValidate.checkGlyph,
  utilities.handleErrors(glyphController.createSingleGlyph)
);

// Update a single glyph (admin and developer only)
router.put(
  '/:id',
  authenticateJWT,
  authorizeRoles('admin', 'developer'),
  glyphsValidate.idRules(),
  glyphsValidate.checkId,
  glyphsValidate.glyphUpdateRules(),
  glyphsValidate.checkGlyph,
  utilities.handleErrors(glyphController.updateSingleGlyph)
);

module.exports = router;
