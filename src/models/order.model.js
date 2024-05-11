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
    // shippedAddress: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Address'
    // },
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
        required:true
    },
    orderStatus:{
        type:String,
        required:true,
        default:'PENDING'
    },
    totalItem:{
        type:Number,
        required:true
    },
    createdAt:{
        type:Date,
        default: Date.now()
    }
})

const Order = mongoose.model('orders', orderSchema);

module.exports = Order;