const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const orderItemSchema = new Schema({
    product:{
        type:mongoose.Types.ObjectId,
        ref:'products',
        required: true
    },
    size:{
        type:String
    },
    quantity:{
        type:Number,
        required:true
    },
    price: {
        type:Number,
        required:true
    },
    discountPrice:{
        type:Number,
        required:true
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'users',
        required: true  
    },
})

const OrderItem = mongoose.model('orderItems', orderItemSchema);

module.exports = OrderItem;