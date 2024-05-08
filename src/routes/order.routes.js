const express = require('express');
const orderController = require('../controller/order.controller');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.post('/', authenticate, orderController.createOrder);
router.get('/user', authenticate, orderController.orderHistory);
router.get('/:id', authenticate, orderController.findOrderById);

module.exports = router;