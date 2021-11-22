const express = require("express");
const router = express.Router();

const application_controller = require("../controllers/application_controller");

router.get("/products", application_controller.products); //this is the route for the products page //products is a function in products_controller.js
//then we will call the products function in products_controller.js

module.exports = router;
