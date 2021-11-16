// initialize models
const User = require('./User');
const Customer = require('./Customer');
const Product = require('./Product');
const Category = require('./Category');
const Order = require('./Order');

// create associations
Product.hasOne(Category);
Category.hasMany(Product);
Order.hasOne(Customer);
Order.hasMany(Product);

// export models
module.exports = { User, Customer, Product, Category, Order };