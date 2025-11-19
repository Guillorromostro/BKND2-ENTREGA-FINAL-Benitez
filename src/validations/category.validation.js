const { body, param } = require('express-validator');

const validateCategory = () => [
  body('name').trim().notEmpty(),
  body('description').optional().isString(),
];

const validateCategoryId = () => [
  param('id').isMongoId(),
];

module.exports = { validateCategory, validateCategoryId };
