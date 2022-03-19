const router = require("express").Router();
const { Product, User } = require("../models/");

router.get("/", (req, res) => {
  res.render("index");
});
//need to add get from product table
// router.get("/products", (req, res) => {
//   // where is /products at in my code ?  it
//   res.render("products");
// });

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

router.get("/contact_me", (req, res) => {
  res.render("contact");
});

router.get("/login", (req, res) => {
  res.render("registration");
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
