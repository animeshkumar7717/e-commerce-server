const CartItem = require('../models/cartItem.model');
const userService = require('../services/user.service');

async function updateCartItem(userId, cartItemId, cartItemData) {
    try {
        const item = await findCartItemById(cartItemId.id);
        if (!item) {
            throw new Error('Cart item not found:', cartItemId);
        }

        const user = await userService.findUserById(item.userId);

        if (!user) {
            throw new Error('User not found: ', userId);
        }

        if (user._id.toString() === userId.toString()) {
            item.quantity = cartItemData.quantity;
            item.price = item.quantity * item.product.price;
            item.discountedPrice = cartItemData.discountedPrice; // Assign validated discountedPrice value
            const updateCartItem = await item.save();
            return updateCartItem;
        } else {
            throw new Error("You can't update this cart item!");
        }
    } catch (error) {
        throw new Error(error.message);
    }
}


async function removeCartItem(userId, cartItemId) {
    const cartItem = await findCartItemById(cartItemId);
    const user = await userService.findUserById(userId);
    if (user._id.toString() === cartItem.userId.toString()) {
        return await CartItem.findByIdAndDelete(cartItem)
    }

    throw new Error("you can not remove another user's item!")
}

async function findCartItemById(cartItemId) {
    const cartItem = await CartItem.findById(cartItemId).populate('product');
    if (cartItem) {
        return cartItem
    } else {
        throw new Error("cart item not found with id", cartItemId)
    }
}

module.exports = {
    updateCartItem,
    removeCartItem,
    findCartItemById
}