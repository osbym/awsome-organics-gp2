'use strict';

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });
  Category.associate = models => {
    // associations can be defined here
    Category.belongsTo(models.Product, {
      foreignKey: {
        allowNull: false
      }
    });
  }
  return Category;
}