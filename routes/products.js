const express = require('express');
const { createProduct, getAllProducts } = require('../controllers/productController');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');

router.post('/', authMiddleware, createProduct);
router.get('/', getAllProducts);

module.exports = router;
