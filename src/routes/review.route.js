const express = require('express');
const reviewController = require('../controller/review.controller');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.post('/', authenticate, reviewController.createReview);
router.get('/product/:productId', authenticate, reviewController.getAllReview);

module.exports = router;