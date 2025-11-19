const Cart = require('../models/cart.model');
const CartItem = require('../models/cartItem.model');

class CartService {
    async createCart(userId) {
        const cart = new Cart({ userId });
        return await cart.save();
    }

    async getCartByUserId(userId) {
        return await Cart.findOne({ userId }).populate('cartItems.productId');
    }

    async addItemToCart(cartId, productId, quantity) {
        const cartItem = new CartItem({ cartId, productId, quantity });
        await cartItem.save();
        return await Cart.findByIdAndUpdate(cartId, { $push: { cartItems: cartItem._id } }, { new: true });
    }

    async updateCartItem(cartItemId, quantity) {
        return await CartItem.findByIdAndUpdate(cartItemId, { quantity }, { new: true });
    }

    async removeItemFromCart(cartId, cartItemId) {
        await CartItem.findByIdAndDelete(cartItemId);
        return await Cart.findByIdAndUpdate(cartId, { $pull: { cartItems: cartItemId } }, { new: true });
    }

    async clearCart(cartId) {
        await CartItem.deleteMany({ cartId });
        return await Cart.findByIdAndUpdate(cartId, { cartItems: [] }, { new: true });
    }
}

module.exports = new CartService();
