const express = require('express');
const orderController = require('../controller/adminOrder.controller');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.get('/', authenticate, orderController.getAllOrders);
router.put('/:orderId/confirmed', authenticate, orderController.confirmOrders);
router.put('/:orderId/ship', authenticate, orderController.shippOrders);
router.put('/:orderId/deliver', authenticate, orderController.deliverOrders);
router.put('/:orderId/cancel', authenticate, orderController.cancelledOrders);
router.put('/:orderId/delete', authenticate, orderController.deleteOrders);

module.exports = router;
