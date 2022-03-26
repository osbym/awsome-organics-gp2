const router = require("express").Router();
const { Product, User, Cart } = require("../models/");
const db = require("../models");
const isAuthenticated = require("../config/middleware/isAuthenticated");

const stripe = require("stripe")(
  "sk_test_51KGGcjDQw3iOHoMjf3YITBwKINTnXK3bur0cgCPuh60dD993ZmOU4Tqoy33u52gPG3usHBJpeZnvJBHuQtUxRK5O00WkMZpfof"
);

router.get("/", (req, res) => {
  res.render("index");
});

//get all products from database
router.get("/products", (req, res) => {
  Product.findAll({
    // include: [User],
  })
    .then((dbProductData) => {
      const products = dbProductData.map((post) => post.get({ plain: true }));

      res.render("products", { products });
      console.log(products);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//sequelize findByPk method
router.get("/product/:id", (req, res) => {
  Product.findByPk(req.params.id)
    .then((dbProductData) => {
      const product = dbProductData.get({ plain: true });
      res.render("single-product", { product });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
  res.render("registration");
});

router.get("/contact_me", (req, res) => {
  res.render("contact");
});

router.get("/privacy", (req, res) => {
  res.render("privacy");
});

router.get("/welcomeuser", (req, res) => {
  res.render("welcomeuser");
});

//admin page
router.get("/admin", (req, res) => {
  res.render("admin");
});

//router.get for the a href product 1 inside the productinfo1.handlebars

//TODO after login

module.exports = router;
