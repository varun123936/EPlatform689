const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = new User({ name, email, password });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });

        res.status(201).json({ token });
    } catch (err) {
        /* res.status(400).json({ error: err.message }); */
        next(err); // Passes the error to the error handler middleware
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });

        res.json({ token });
    } catch (err) {
        /* res.status(400).json({ error: err.message }); */
        next(err); // Passes the error to the error handler middleware
    }
};

module.exports = { registerUser, loginUser };
