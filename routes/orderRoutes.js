const express = require('express');
const { createOrder, getOrderById } = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createOrder);
router.get('/:id', authMiddleware, getOrderById);

module.exports = router;
