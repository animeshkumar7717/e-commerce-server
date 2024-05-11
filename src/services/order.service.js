const Address = require('../models/address.model');
const Order = require('../models/order.model');
const OrderItem = require('../models/orderItems.model');
const cartService = require('../services/cart.service');

// async function createOrder(user, shippedAddress) {
//     let address;
//     if (shippedAddress._id) {
//         let isExistsAddress = await Address.findById(shippedAddress._id);
//         address = isExistsAddress
//     } else {
//         address = new Address(shippedAddress);
//         address.user = user;
//         await address.save();

//         user.address.push(address);
//         await user.save();
//     }

//     const cart = await cartService.findUserCart(user._id);
//     const orderItems = [];

//     for (const item of cart.cartItems) {
//         const orderItem = new OrderItem({
//             price: item.price,
//             product: item.product,
//             quantity: item.quantity,
//             size: item.size,
//             userId: item.userId,
//             discountedPrice: item.discountedPrice,
//         })
//         const createdOrderItem = await orderItem.save();
//         orderItems.push(createdOrderItem);
//     }

//     const createdOrder = new Order({
//         user,
//         orderItems,
//         totalPrice: cart.totalPrice,
//         totalDiscountedPrice: cart.totalDiscountPrice,
//         discount: cart.discount,
//         totalItem: cart.totalItem,
//         shippedAddress: address
//     })

//     const savedOrder = await createdOrder.save();
//     return savedOrder;

// }

async function createOrder(user, shippedAddress) {
    let address;

    if (shippedAddress._id) {
        // If shippedAddress is an ID, fetch the address details
        address = await Address.findById(shippedAddress._id);
    } else {
        // If shippedAddress is already an address object, use it directly
        address = new Address(shippedAddress);
        address.user = user;

        try {
            // Save the address object
            address = await address.save();

            // Update user's address list
            user.address.push(address);
            await user.save();
        } catch (error) {
            throw new Error("Error saving address: " + error.message);
        }
    }

    const cart = await cartService.findUserCart(user._id);
    const orderItems = [];

    for (const item of cart.cartItems) {
        const orderItem = new OrderItem({
            price: item.price,
            product: item.product,
            quantity: item.quantity,
            size: item.size,
            userId: item.userId,
            discountedPrice: item.discountedPrice,
        });
        const createdOrderItem = await orderItem.save();
        orderItems.push(createdOrderItem);
    }

    const createdOrder = new Order({
        user,
        orderItems,
        totalPrice: cart.totalPrice,
        totalDiscountedPrice: cart.totalDiscountPrice,
        discount: cart.discount,
        totalItem: cart.totalItem,
        shippedAddress: address
    });

    const savedOrder = await createdOrder.save();
    return savedOrder;
}

/**
 * This is for Admin user!
 */
async function placeOrder(orderId) {
    const order = await findOrderById(orderId);

    order.orderStatus = "PLACED";
    order.paymentDetails.status = "COMPLETED"

    return await order.save()
}

async function confirmOrder(orderId) {
    const order = await findOrderById(orderId);

    order.orderStatus = "CONFIRMED";

    return await order.save()
}

async function shipOrder(orderId) {
    const order = await findOrderById(orderId);

    order.orderStatus = "SHIPPED";

    return await order.save()
}

async function deliverOrder(orderId) {
    const order = await findOrderById(orderId);

    order.orderStatus = "DILIVERED";

    return await order.save()
}

async function cancelledOrder(orderId) {
    const order = await findOrderById(orderId);

    order.orderStatus = "CANCELLED";

    return await order.save()
}

async function findOrderById(orderId) {
    const order = await Order.findById(orderId)
        .populate("user")
        .populate({ path: "orderItems", populate: { path: "product" } })
        .populate("shippingAddress")
    return order
}

async function usersOrderHistory(userId) {
    try {
        const orders = await Order.find({ user: userId, orderStatus: "PLACED" })
            .populate({ path: 'orderItems', populate: { path: 'product' } }).lean()

        return orders
    } catch (error) {
        throw new Error(error.message)
    }
}

/** This is for admin, for all the ordered products */
async function getAllOrders() {
    return await await Order.find()
        .populate({ path: 'orderItems', populate: { path: 'product' } }).lean()
}

async function deleteOrder(orderId) {
    const order = findOrderById(orderId)
    await Order.findByIdAndDelete(order._id)
}


module.exports = {
    createOrder,
    placeOrder,
    confirmOrder,
    shipOrder,
    deliverOrder,
    findOrderById,
    cancelledOrder,
    usersOrderHistory,
    getAllOrders,
    deleteOrder
}