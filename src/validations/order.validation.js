const Joi = require('joi');

const orderValidationSchema = Joi.object({
    userId: Joi.string().required(),
    totalAmount: Joi.number().required(),
    status: Joi.string().valid('pending', 'completed', 'canceled').required(),
    items: Joi.array().items(
        Joi.object({
            productId: Joi.string().required(),
            quantity: Joi.number().integer().min(1).required()
        })
    ).required()
});

const validateOrder = (req, res, next) => {
    const { error } = orderValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

module.exports = {
    validateOrder
};
