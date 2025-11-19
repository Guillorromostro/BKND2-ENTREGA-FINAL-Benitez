const Joi = require('joi');
const { body, param } = require('express-validator');

const productValidationSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).max(500).optional(),
  price: Joi.number().greater(0).required(),
  category: Joi.string().required(),
});

const validateProduct = (req, res, next) => {
  const { error } = productValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

const validateProductInput = () => [
  body('name').trim().notEmpty(),
  body('price').isFloat({ gt: 0 }),
  body('category').trim().notEmpty(),
  body('stock').optional().isInt({ min: 0 }),
];

const validateProductId = () => [
  param('id').isMongoId(),
];

module.exports = {
  validateProduct,
  validateProductInput,
  validateProductId,
};
