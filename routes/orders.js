const express = require('express');
const { createOrder } = require('../controllers/orderController');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');

router.post('/', authMiddleware, createOrder);

module.exports = router;
