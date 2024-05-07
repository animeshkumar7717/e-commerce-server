const express = require('express');
const cartController = require('../controller/cart.controller');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.get('/', authenticate, cartController.findUserCart);
router.put('/add', authenticate, cartController.addItemToCart);

module.exports = router;