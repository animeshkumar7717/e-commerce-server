const CartItem = require('../models/cartItem.model');
const userService = require('../services/user.service');

async function updateCartItem(userId, cartItemId, cartItemData) {
    console.log('---------',userId, cartItemId, cartItemData);
    try {
        const item = await findCartItemById(cartItemId.id);
        console.log('item', item);
        if (!item) {
            throw new Error('Cart item not found:', cartItemId);
        }

        // // Validate discountedPrice
        // if (isNaN(cartItemData.discountedPrice)) {
        //     // Handle invalid discountedPrice value
        //     throw new Error('Invalid discountedPrice value');
        // }

        const user = await userService.findUserById(item.userId);

        if (!user) {
            throw new Error('User not found: ', userId);
        }

        console.log('itemmmmmmmm', item.product);
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
        console.log('error11111111111', error);
        throw new Error(error.message);
    }
}


async function removeCartItem(userId, cartItemId) {
    console.log('cartItemId', cartItemId);
    const cartItem = await findCartItemById(cartItemId);
    console.log('cartItem', cartItem);
    const user = await userService.findUserById(userId);
    console.log('useruser', user._id);
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