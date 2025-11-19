import Joi from 'joi';

const cartItemSchema = Joi.object({
    productId: Joi.string().required().messages({
        'string.empty': 'Product ID is required',
        'any.required': 'Product ID is required'
    }),
    quantity: Joi.number().integer().min(1).required().messages({
        'number.base': 'Quantity must be a number',
        'number.integer': 'Quantity must be an integer',
        'number.min': 'Quantity must be at least 1',
        'any.required': 'Quantity is required'
    })
});

const addToCartValidation = (req, res, next) => {
    const { error } = cartItemSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

const updateCartValidation = (req, res, next) => {
    const { error } = cartItemSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

export { addToCartValidation, updateCartValidation };
