const Product = require('../models/Product');
const logger = require('../utils/logger');

exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, stock } = req.body;
        const product = await Product.create({ name, description, price, stock });
        res.status(201).json(product);
        logger.info(`Product created: ${name}`);
    } catch (error) {
        logger.error(`Error creating product: ${error.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        logger.error(`Error fetching products: ${error.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
