const Order = require('../models/order.model');
const OrderItem = require('../models/orderItem.model');
const User = require('../models/user.model');
const Product = require('../models/product.model');
const Ticket = require('../models/ticket.model');

const createOrder = async (userId, orderData) => {
    const order = new Order({
        userId,
        totalAmount: orderData.totalAmount,
        status: 'Pending',
    });
    await order.save();

    const orderItems = orderData.items.map(item => ({
        orderId: order._id,
        productId: item.productId,
        quantity: item.quantity,
    }));

    await OrderItem.insertMany(orderItems);
    return order;
};

const getOrderById = async (orderId) => {
    return await Order.findById(orderId).populate('userId').populate({
        path: 'orderItems',
        populate: { path: 'productId' }
    });
};

const getAllOrders = async (userId) => {
    return await Order.find({ userId }).populate('userId');
};

const updateOrderStatus = async (orderId, status) => {
    return await Order.findByIdAndUpdate(orderId, { status }, { new: true });
};

const deleteOrder = async (orderId) => {
    await OrderItem.deleteMany({ orderId });
    return await Order.findByIdAndDelete(orderId);
};

async function checkout(userId, cartItems) {
  // cartItems: [{ productId, quantity }]
  const items = [];
  let amount = 0;
  for (const { productId, quantity } of cartItems) {
    const p = await Product.findById(productId);
    if (!p) continue;
    if (p.stock >= quantity) {
      p.stock -= quantity;
      await p.save();
      items.push({ product: p._id, quantity, price: p.price, status: 'purchased' });
      amount += p.price * quantity;
    } else {
      items.push({ product: p._id, quantity, price: p.price, status: 'out_of_stock' });
    }
  }
  const status = items.every(i => i.status === 'purchased') ? 'complete' : 'partial';
  const ticket = await Ticket.create({ purchaser: userId, items, amount, status });
  return ticket;
}

module.exports = {
    createOrder,
    getOrderById,
    getAllOrders,
    updateOrderStatus,
    deleteOrder,
    checkout
};
