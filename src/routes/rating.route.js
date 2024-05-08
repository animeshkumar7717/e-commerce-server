const express = require('express');
const ratingController = require('../controller/rating.controller');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.post('/create', authenticate, ratingController.createRating);
router.put('/product/:productId', authenticate, ratingController.getAllRating);

module.exports = router;