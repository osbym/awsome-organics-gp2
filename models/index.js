const User = require("./User");
const Product = require("./Product");
const Cart = require("./Cart");

//We use these relationships to create the relationships between the models so that when we query the database, we can get the data we need.

Cart.belongsTo(User, {
  foreignKey: "id",
  onDelete: "CASCADE",
});

Cart.belongsTo(Product, {
  foreignKey: "id",
  onDelete: "CASCADE",
});

User.hasMany(Cart, {
  foreignKey: "id",
  onDelete: "CASCADE",
});

Product.hasMany(Cart, {
  foreignKey: "id",
  onDelete: "CASCADE",
});

module.exports = { User, Product, Cart };
