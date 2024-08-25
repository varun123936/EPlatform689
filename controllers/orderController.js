const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Product = require('../models/Product');
const logger = require('../utils/logger');

exports.createOrder = async (req, res) => {
    const { userId, items } = req.body;
    try {
        const order = await Order.create({ userId, total: 0 });
        let total = 0;

        for (const item of items) {
            const product = await Product.findByPk(item.productId);
            if (product && product.stock >= item.quantity) {
                const price = product.price * item.quantity;
                await OrderItem.create({
                    orderId: order.id,
                    productId: product.id,
                    quantity: item.quantity,
                    price,
                });
                total += price;
                product.stock -= item.quantity;
                await product.save();
            } else {
                logger.warn(`Product out of stock: ${product.name}`);
            }
        }

        order.total = total;
        await order.save();
        res.status(201).json(order);
        logger.info(`Order created: ${order.id}`);
    } catch (error) {
        logger.error(`Error creating order: ${error.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
