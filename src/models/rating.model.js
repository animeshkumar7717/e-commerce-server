const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const ratingSchema = new Schema({
    user: {
        type:mongoose.Types.ObjectId,
        ref:'users',
        required:true
    },
    product: {
        type:mongoose.Types.ObjectId,
        ref:'products',
        required:true
    },
    rating: {
        type:Number,
        required:true
    },
    createdAt: {
        type:Date,
        default:Date.now()
    }
})

const Rating = mongoose.model('ratings', ratingSchema);

module.exports = Rating;