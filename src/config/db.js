const mongoose = require('mongoose')

// const mongoUrl = 'mongodb+srv://animeshkumar7717:eCYsgzLqMwFU9g53@cluster0.dehmdgw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const mongoUrl = 'mongodb://localhost:27017/e-commerce'
const connectDb = () => {
    return mongoose.connect(mongoUrl);
}

module.exports = { connectDb }
