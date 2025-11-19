import mongoose from 'mongoose';
import User from './user.model.js';
import Product from './product.model.js';
import Category from './category.model.js';
import Cart from './cart.model.js';
import CartItem from './cartItem.model.js';
import Order from './order.model.js';
import OrderItem from './orderItem.model.js';
import RefreshToken from './refreshToken.model.js';

const db = {
  mongoose,
  User,
  Product,
  Category,
  Cart,
  CartItem,
  Order,
  OrderItem,
  RefreshToken,
};

export default db;
