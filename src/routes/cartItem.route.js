const express = require('express');
const cartItemController = require('../controller/cartItem.controller');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.put('/:id', authenticate, cartItemController.updateCartItem);
router.delete('/:id', authenticate, cartItemController.removeCartItem);

module.exports = router;