const { body, param } = require('express-validator');

const userValidationRules = () => [
  body('username').trim().notEmpty().isLength({ min: 3 }),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
];

const updateUserValidationRules = () => [
  param('id').isMongoId(),
  body('username').optional().isLength({ min: 3 }),
  body('email').optional().isEmail().normalizeEmail(),
  body('password').optional().isLength({ min: 6 }),
  body('role').optional().isIn(['user', 'admin']),
];

module.exports = { userValidationRules, updateUserValidationRules };
