const Order = require('../models/order.model');
const OrderItem = require('../models/orderItem.model');
const ApiResponse = require('../utils/apiResponse');

exports.createOrder = async (req, res) => {
    try {
        const { userId, totalAmount, items } = req.body;

        const order = new Order({
            userId,
            totalAmount,
            status: 'Pending',
        });

        const savedOrder = await order.save();

        const orderItems = items.map(item => ({
            orderId: savedOrder._id,
            productId: item.productId,
            quantity: item.quantity,
        }));

        await OrderItem.insertMany(orderItems);

        return ApiResponse.success(res, 'Order created successfully', savedOrder);
    } catch (error) {
        return ApiResponse.error(res, 'Error creating order', error);
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('userId');
        return ApiResponse.success(res, 'Orders retrieved successfully', orders);
    } catch (error) {
        return ApiResponse.error(res, 'Error retrieving orders', error);
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('userId');
        if (!order) {
            return ApiResponse.error(res, 'Order not found', null, 404);
        }
        return ApiResponse.success(res, 'Order retrieved successfully', order);
    } catch (error) {
        return ApiResponse.error(res, 'Error retrieving order', error);
    }
};

// Update an order
exports.updateOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedOrder) {
            return ApiResponse.error(res, 'Order not found', null, 404);
        }
        return ApiResponse.success(res, 'Order updated successfully', updatedOrder);
    } catch (error) {
        return ApiResponse.error(res, 'Error updating order', error);
    }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) {
            return ApiResponse.error(res, 'Order not found', null, 404);
        }
        return ApiResponse.success(res, 'Order deleted successfully', deletedOrder);
    } catch (error) {
        return ApiResponse.error(res, 'Error deleting order', error);
    }
};


