'use strict';

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false      
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  });
  Order.associate = models => {
    // associations can be defined here
    Order.belongsTo(models.Customer, {
      foreignKey: {
        allowNull: false
      }
    });
  }
  return Order;
}