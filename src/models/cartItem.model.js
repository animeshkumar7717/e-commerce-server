const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    cart:{
        type:mongoose.Schema.ObjectId,
        ref:'cart',
        required:true
    },
    product:{
        type:mongoose.Schema.ObjectId,
        ref:'products',
        required:true
    },
    size:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
        default:1
    },
    price:{
        type:Number,
        required:true,
    },
    discountedPrice:{
        type:Number,
        default:0
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'users',
        required:true
    }
})

const CartItem = mongoose.model("cartItems", cartItemSchema)

module.exports = CartItem;
