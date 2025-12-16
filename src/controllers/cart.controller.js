const cartService = require('../services/cart.service');
const asyncHandler = require('../utils/asyncHandler');

const notImplemented = (res, name) =>
  res.status(501).json({ message: `${name} not implemented` });

const getUserId = (req) => req.user?.id || req.user?._id || req.params.userId;

async function getCart(req, res, next) {
  if (cartService && typeof cartService.getUserCart === 'function') {
    const cart = await cartService.getUserCart(getUserId(req));
    return res.json(cart);
  }
  return notImplemented(res, 'getUserCart');
}

async function addItemToCart(req, res, next) {
  if (cartService && typeof cartService.addItemToCart === 'function') {
    const cart = await cartService.addItemToCart(getUserId(req), req.body);
    return res.status(201).json(cart);
  }
  return notImplemented(res, 'addItemToCart');
}

async function removeItemFromCart(req, res, next) {
  if (cartService && typeof cartService.removeItemFromCart === 'function') {
    await cartService.removeItemFromCart(getUserId(req), req.params.itemId);
    return res.status(204).send();
  }
  return notImplemented(res, 'removeItemFromCart');
}

module.exports = {
  getCart,
  addItemToCart,
  removeItemFromCart,
};
