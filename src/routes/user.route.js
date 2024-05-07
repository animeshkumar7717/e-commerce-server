const express = require('express');
const userController = require('../controller/user.controller');
const router = express.Router();

router.get('/profile', userController.getUserProfile)
router.get('/', userController.getAllUsers)

module.exports = router;
