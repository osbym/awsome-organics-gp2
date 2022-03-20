const User = require("./User");
const Product = require("./Product");
const Cart = require("./Cart");

Cart.belongsTo(User, {
  foreignKey: "UserId", // foreignKey: "UserId" means that the id of the user is the id of the cart
  onDelete: "CASCADE", // <-- if the User gets deleted, also delete the Cart
});

Cart.belongsTo(Product, {
  foreignKey: "ProductId",
  onDelete: "CASCADE", //oneDelete: "CASCADE" means that if the user is deleted, all of their carts will be deleted as well
});

module.exports = { User, Product, Cart };
