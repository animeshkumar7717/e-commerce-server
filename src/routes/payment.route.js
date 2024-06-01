const express = require('express');
const paymentController = require('../controller/payment.controller');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.post('/:id', authenticate, paymentController.createPaymentLink);
router.get('/', authenticate, paymentController.updatePaymentInformation );

module.exports = router;