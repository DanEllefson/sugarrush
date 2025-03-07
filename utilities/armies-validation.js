'use strict';

const { body, param, validationResult } = require('express-validator');
const armiesValidate = {};

/*************************************
 *  MongoId validation rules
 *************************************/
armiesValidate.idRules = () => {
  return [param('id').isMongoId().withMessage('Invalid ID')];
};

/*************************************
 *  Check MongoId validation
 *************************************/
armiesValidate.checkId = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ errors: errors.array() });
};

/*************************************
 *  Create army validation rules
 *************************************/
armiesValidate.armyAddRules = () => {
  return [
    body('name')
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage('Army name must be more than 1 character'),

    body('type')
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage('Army type must be more than 1 character'),

    body('general').isMongoId().withMessage('Invalid ID'),

    body('attack').isInt({ min: 0 }).withMessage('Attack must be a positive number'),

    body('defense').isInt({ min: 0 }).withMessage('Defense must be a positive number'),

    body('move').isInt({ min: 0 }).withMessage('Move must be a positive number'),

    body('range').isInt({ min: 0 }).withMessage('Range must be a positive number'),

    body('life').isInt({ min: 0 }).withMessage('Life must be a positive number'),

    body('cost').isInt({ min: 0 }).withMessage('Cost must be a positive number'),

    body('specialPowers')
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage('Special powers must be more than 1 character'),

    body('class')
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage('Army class must be more than 1 character'),

    body('species')
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage('Army species must be more than 1 character'),

    body('personality')
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage('Army personality must be more than 1 character'),

    body('size')
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage('Army size must be more than 1 character'),

    body('height').isInt({ min: 1 }).withMessage('Height must be 1 or greater'),

    body('url').isURL().notEmpty().withMessage('Must be a valid URL'),

    body('wave').isMongoId().withMessage('Invalid ID')
  ];
};

/*************************************
 *  Update army validation rules
 *************************************/
armiesValidate.armyUpdateRules = () => {
  return [
    body('name')
      .optional()
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage('Army name must be more than 1 character'),

    body('type')
      .optional()
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage('Army type must be more than 1 character'),

    body('general').optional().isMongoId().withMessage('Invalid ID'),

    body('attack').optional().isInt({ min: 0 }).withMessage('Attack must be a positive number'),

    body('defense').optional().isInt({ min: 0 }).withMessage('Defense must be a positive number'),

    body('move').optional().isInt({ min: 0 }).withMessage('Move must be a positive number'),

    body('range').optional().isInt({ min: 0 }).withMessage('Range must be a positive number'),

    body('life').optional().isInt({ min: 0 }).withMessage('Life must be a positive number'),

    body('cost').optional().isInt({ min: 0 }).withMessage('Cost must be a positive number'),

    body('specialPowers')
      .optional()
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage('Special powers must be more than 1 character'),

    body('class')
      .optional()
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage('Army class must be more than 1 character'),

    body('species')
      .optional()
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage('Army species must be more than 1 character'),

    body('personality')
      .optional()
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage('Army personality must be more than 1 character'),

    body('size')
      .optional()
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage('Army size must be more than 1 character'),

    body('height').optional().isInt({ min: 1 }).withMessage('Height must be 1 or greater'),

    body('url').optional().isURL().notEmpty().withMessage('Must be a valid URL'),

    body('wave').optional().isMongoId().withMessage('Invalid ID')
  ];
};

/*************************************
 *  Army validation check
 *************************************/
armiesValidate.checkArmy = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ errors: errors.array() });
};

module.exports = armiesValidate;
