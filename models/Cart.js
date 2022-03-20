const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Cart extends Model {}
//here I need to define a Cart model that has a quantity field of integer,
Cart.init(
  {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1, 10],
      },
    },
  },

  //then need to add sequelize, and export the model
  {
    sequelize,
  }
);

module.exports = Cart;
