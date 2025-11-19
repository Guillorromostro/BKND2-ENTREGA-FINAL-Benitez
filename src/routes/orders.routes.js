const express = require('express');
const orderController = require('../controllers/order.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const { authorize } = require('../middlewares/role.middleware');

const router = express.Router();

router.get('/', authenticate, authorize('admin'), orderController.getAllOrders);
router.get('/:id', authenticate, orderController.getOrderById);
router.post('/', authenticate, orderController.createOrder);
router.put('/:id', authenticate, authorize('admin'), orderController.updateOrder);
router.delete('/:id', authenticate, authorize('admin'), orderController.deleteOrder);

module.exports = router;
