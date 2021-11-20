const express = require("express");
const router = express.Router();

const orders = require("../controllers/orders");

router.get("/", orders.getOrders); // get all orders

router.post("/", orders.postOrders); // create new order

module.exports = router;
