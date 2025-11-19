const Order = require('../models/order.model');
const OrderItem = require('../models/orderItem.model');

class OrderRepository {
    async createOrder(orderData) {
        const order = new Order(orderData);
        return await order.save();
    }

    async getOrderById(orderId) {
        return await Order.findById(orderId).populate('orderItems');
    }

    async getAllOrders() {
        return await Order.find().populate('orderItems');
    }

    async updateOrder(orderId, updateData) {
        return await Order.findByIdAndUpdate(orderId, updateData, { new: true });
    }

    async deleteOrder(orderId) {
        return await Order.findByIdAndDelete(orderId);
    }

    async addOrderItem(orderId, orderItemData) {
        const orderItem = new OrderItem(orderItemData);
        await orderItem.save();
        return await Order.findByIdAndUpdate(orderId, { $push: { orderItems: orderItem._id } }, { new: true });
    }

    async removeOrderItem(orderId, orderItemId) {
        await OrderItem.findByIdAndDelete(orderItemId);
        return await Order.findByIdAndUpdate(orderId, { $pull: { orderItems: orderItemId } }, { new: true });
    }
}

module.exports = new OrderRepository();
