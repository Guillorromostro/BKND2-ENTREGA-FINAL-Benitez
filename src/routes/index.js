const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth.routes'));
router.use('/sessions', require('./sessions.routes'));
router.use('/users', require('./users.routes'));
router.use('/products', require('./products.routes'));
router.use('/categories', require('./categories.routes'));
router.use('/carts', require('./carts.routes'));
router.use('/orders', require('./orders.routes'));

module.exports = router;
