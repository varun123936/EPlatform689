const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Order = sequelize.define('Order', {
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
});

Order.belongsTo(User, { foreignKey: 'userId' });

module.exports = Order;
