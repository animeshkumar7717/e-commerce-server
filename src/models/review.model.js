const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const reviewSchema = new Schema({
    review: {
        type:String,
        required:true
    },
    product: {
        type:mongoose.Types.ObjectId,
        ref:'products',
        required:true
    },
    user: {
        type:mongoose.Types.ObjectId,
        ref:'users',
        required:true
    },
    createdAt: {
        type:Date,
        default:Date.now()
    }
})

const Review = mongoose.model('reviews', reviewSchema);

module.exports = Review;