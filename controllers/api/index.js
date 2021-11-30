const router = require("express").Router();
const users = require("./usersroutes"); //this is the users route
const products = require("./productsroutes"); //this is the products route
//const orders = require("./routes/orders"); //this is the orders route

router.use("/users", users); // this will be the root of the users (/users) and will be handled by the users controller
router.use("/products", products);

module.exports = router;
