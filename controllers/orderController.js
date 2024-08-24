const Order = require('../models/Order');

const createOrder = async (req, res) => {
    const { orderItems, totalPrice } = req.body;

    try {
        const order = new Order({
            user: req.user._id,
            orderItems,
            totalPrice,
        });
        await order.save();
        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email');
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { createOrder, getOrderById };
