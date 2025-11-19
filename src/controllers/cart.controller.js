const cartService = require('../services/cart.service');
const asyncHandler = require('../utils/asyncHandler');

const notImplemented = (res, name) =>
  res.status(501).json({ message: `${name} not implemented` });

const getUserId = (req) => req.user?.id || req.user?._id || req.params.userId;

const getUserCart = asyncHandler(async (req, res) => {
  if (cartService && typeof cartService.getUserCart === 'function') {
    const cart = await cartService.getUserCart(getUserId(req));
    return res.json(cart);
  }
  return notImplemented(res, 'getUserCart');
});

const addItemToCart = asyncHandler(async (req, res) => {
  if (cartService && typeof cartService.addItemToCart === 'function') {
    const cart = await cartService.addItemToCart(getUserId(req), req.body);
    return res.status(201).json(cart);
  }
  return notImplemented(res, 'addItemToCart');
});

const updateCartItem = asyncHandler(async (req, res) => {
  if (cartService && typeof cartService.updateCartItem === 'function') {
    const cart = await cartService.updateCartItem(getUserId(req), req.params.itemId, req.body);
    return res.json(cart);
  }
  return notImplemented(res, 'updateCartItem');
});

const removeItemFromCart = asyncHandler(async (req, res) => {
  if (cartService && typeof cartService.removeItemFromCart === 'function') {
    await cartService.removeItemFromCart(getUserId(req), req.params.itemId);
    return res.status(204).send();
  }
  return notImplemented(res, 'removeItemFromCart');
});

const clearCart = asyncHandler(async (req, res) => {
  if (cartService && typeof cartService.clearCart === 'function') {
    await cartService.clearCart(getUserId(req));
    return res.status(204).send();
  }
  return notImplemented(res, 'clearCart');
});

module.exports = {
  getUserCart,
  addItemToCart,
  updateCartItem,
  removeItemFromCart,
  clearCart,
};
