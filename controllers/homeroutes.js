const router = require("express").Router();
const { Product, User } = require("../models/");

router.get("/", (req, res) => {
  res.render("index");
});
//need to add get from product table
router.get("/products", (req, res) => { // where is /products at in my code ?  it 
  res.render("products");
});

router.get("/contact_me", (req, res) => {
  res.render("contact");
});

router.get("/login", (req, res) => {
  res.render("registration");
});

router.get("/privacy", (req, res) => {
  res.render("privacy");
});

//get the chapstick page
router.get("/chapstick", (req, res) => {
  res.render("chapstick");
});


//router.get for the a href product 1 inside the productinfo1.handlebars




//TODO after login

module.exports = router;
