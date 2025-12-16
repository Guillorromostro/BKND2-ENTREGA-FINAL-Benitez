const express = require('express');
const router = express.Router();

const { authenticate } = require('../middlewares/auth.middleware');
const { authorize } = require('../middlewares/role.middleware');
const { getCart, addItemToCart, removeItemFromCart } = require('../controllers/cart.controller');

router.get('/:cartId', authenticate, getCart);
router.post('/:cartId/items', authenticate, authorize('user'), addItemToCart);
router.delete('/:cartId/items/:itemId', authenticate, authorize('user'), removeItemFromCart);

module.exports = router;
