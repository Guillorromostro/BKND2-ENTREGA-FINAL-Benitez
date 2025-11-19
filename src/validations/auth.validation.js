const { body } = require('express-validator');

const registerValidationRules = () => [
  body('username').trim().notEmpty().isLength({ min: 3 }),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
];

const loginValidationRules = () => [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty(),
];

module.exports = { registerValidationRules, loginValidationRules };
