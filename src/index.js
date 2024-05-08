const express = require('express');
const cors = require('cors');
const authRouters = require('./routes/auth.route')
const userRouters = require('./routes/user.route')
const productRouters = require('./routes/product.route')
const adminProductRouters = require('./routes/adminProduct.route')
const cartRouters = require('./routes/cart.route')
const cartItemRouters = require('./routes/cartItem.route')
const orderRouters = require('./routes/order.routes')
const adminOrderRouters = require('./routes/adminOrder.route')
const reviewRouters = require('./routes/review.route')
const ratingRouters = require('./routes/rating.route')

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRouters);
app.use('/api/users', userRouters); // working 
app.use('/api/product', productRouters);    
app.use('/api/admin/product', adminProductRouters);
app.use('/api/cart', cartRouters);
app.use('/api/cart_items', cartItemRouters);
app.use('/api/orders', orderRouters);
app.use('/api/admin/orders', adminOrderRouters);
app.use('/api/reviews', reviewRouters);
app.use('/api/ratings', ratingRouters);

module.exports=app;
