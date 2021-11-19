'use strict';

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  });
  Product.associate = models => {
    // associations can be defined here
    Product.hasMany(models.Category, {
      foreignKey: {
        allowNull: false
      }
    });
  }
  return Product;
}