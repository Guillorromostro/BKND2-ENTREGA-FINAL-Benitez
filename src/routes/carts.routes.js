const express = require('express');
const cartController = require('../controllers/cart.controller');
const { authenticate } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', authenticate, cartController.getUserCart);
router.post('/items', authenticate, cartController.addItemToCart);
router.put('/items/:itemId', authenticate, cartController.updateCartItem);
router.delete('/items/:itemId', authenticate, cartController.removeItemFromCart);
router.delete('/', authenticate, cartController.clearCart);

module.exports = router;
