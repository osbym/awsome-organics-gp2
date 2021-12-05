const router = require("express").Router();
const { Product, User } = require("../models/");

router.get("/", (req, res) => {
  res.render("index");
});
//need to add get from product table
router.get("/products", (req, res) => {
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

//TODO after login

module.exports = router;
