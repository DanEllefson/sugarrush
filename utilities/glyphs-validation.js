'use strict';

const { body, param, validationResult } = require('express-validator');
const glyphsValidate = {};

/*************************************
 *  MongoId validation rules
 *************************************/
glyphsValidate.idRules = () => {
  return [param('id').isMongoId().withMessage('Invalid ID')];
};

/*************************************
 *  Check MongoId validation
 *************************************/
glyphsValidate.checkId = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ errors: errors.array() });
};

/*************************************
 *  Create hlyph validation rules
 *************************************/
glyphsValidate.glyphAddRules = () => {
  return [
    body('name')
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage('Glyph name must be more than 1 character'),

    body('wave')
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage('Glyph wave must be more than 1 character'),

    body('summary')
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage('Glyph summary must be more than 1 character'),

    body('description')
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage('Glyph description must be more than 1 character')
  ];
};

/*************************************
 *  Update hlyph validation rules
 *************************************/
glyphsValidate.glyphUpdateRules = () => {
  return [
    body('name')
      .optional()
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage('Glyph name must be more than 1 character'),

    body('wave')
      .optional()
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage('Glyph wave must be more than 1 character'),

    body('summary')
      .optional()
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage('Glyph summary must be more than 1 character'),

    body('description')
      .optional()
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage('Glyph description must be more than 1 character')
  ];
};

/*************************************
 *  Glyph validation check
 *************************************/
glyphsValidate.checkGlyph = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ errors: errors.array() });
};

module.exports = glyphsValidate;
