const { Product } = require("../models");

const productdata = [
  {
    name: "Chapstick",
    category_id: 1,
    description:
      "Handmade chapstick that is 100% organic.  Complete with a touch of love and care. Comes in a variety of scents.",
    quantity: 100,
    price: 3.5,
  },
  {
    name: "Hand Sanitizer",
    category_id: 2,
    description:
      "Handmade hand sanitizer that is 100% organic.  Complete with a touch of love and care.",
    quantity: 100,
    price: 15,
  },
  {
    name: "Beeswax Candle",
    category_id: 3,
    description: "Handmade beeswax candle that is 100% organic.",
    quantity: 10,
    price: 12,
  },
  {
    name: "Essential Oils",
    category_id: 4,
    description: "Handmade essential oils that are 100% organic.",
    quantity: 100,
    price: 35,
  },
  {
    name: "Moisturizer",
    category_id: 5,
    description: "Handmade moisturizer that is 100% organic.",
    quantity: 100,
    price: 35,
  },
  {
    name: "Bundle",
    category_id: 6,
    description:
      "Buy a bundle of all the products to save money and get your favorite products.",
    quantity: 100,
    price: 35,
  },
];
const seedProducts = () => Comment.bulkCreate(productdata);

module.exports = seedProducts;
