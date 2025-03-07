'use strict';

const { body, param, validationResult } = require('express-validator');
const generalsValidate = {};

/*************************************
 *  MongoId validation rules
 *************************************/
generalsValidate.idRules = () => {
  return [param('id').isMongoId().withMessage('Invalid ID')];
};

/*************************************
 *  Check MongoId validation
 *************************************/
generalsValidate.checkId = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ errors: errors.array() });
};

/*************************************
 *  Create general validation rules
 *************************************/
generalsValidate.generalAddRules = () => {
  return [
    body('name')
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage('General name must be more than 1 character'),

    body('background')
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage('General background must be more than 1 character'),

    body('symbol').isURL().notEmpty().withMessage('Must be a valid URL')
  ];
};

/*************************************
 *  Update general validation rules
 *************************************/
generalsValidate.generalUpdateRules = () => {
  return [
    body('name')
      .optional()
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage('General name must be more than 1 character'),

    body('background')
      .optional()
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage('General background must be more than 1 character'),

    body('symbol').optional().isURL().notEmpty().withMessage('Must be a valid URL')
  ];
};

/*************************************
 *  General validation check
 *************************************/
generalsValidate.checkGeneral = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ errors: errors.array() });
};

module.exports = generalsValidate;
