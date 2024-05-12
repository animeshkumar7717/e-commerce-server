const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const orderSchema = new Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:'users'
    },
    orderItems:[
        {
            type:mongoose.Types.ObjectId,
            ref:'orderItems'
        }
    ],
    orderDate:{
        type: Date,
        require: true
    },
    deliveryDate:{
        type: Date
    },
    shippingAddress:{
        type:mongoose.Types.ObjectId,
        ref:'addresses'
    },
    paymentDetails:{
        paymentMethod:{
            type:String
        },
        transactionId:{
            type:String
        },
        paymentId:{
            type:String
        },
        paymentStatus:{
            type:String,
            default:'PENDING'
        }
    },
    discount:{
        type:Number,
        required:true,
        default:0
    },
    orderStatus:{
        type:String,
        required:true,
        default:'PENDING'
    },
    totalItem:{
        type:Number,
        required:true,
        default:0
    },
    totalPrice:{
        type:Number,
        required:true,
        default:0
    },
    totalDiscountedPrice:{
        type:Number,
        required:true,
        default:0
    },
    createdAt:{
        type:Date,
        default: Date.now()
    }
})

const Order = mongoose.model('orders', orderSchema);

module.exports = Order;