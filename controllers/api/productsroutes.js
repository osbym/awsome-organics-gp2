const router = require("express").Router();
const { Product } = require("../../models/");
const stripe = require("stripe")(
  "sk_test_51KGGcjDQw3iOHoMjf3YITBwKINTnXK3bur0cgCPuh60dD993ZmOU4Tqoy33u52gPG3usHBJpeZnvJBHuQtUxRK5O00WkMZpfof"
);

//TODO create a route to get all products
router.get("/", (req, res) => {
  //Acces our Product model and run .findAll() method)
  Product.findAll()
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//TODO get a single product by id
router.get("/:id", (req, res) => {
  Product.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  Product.create({
    id: req.body.id,
    name: req.body.name,
    category_id: req.body.category_id,
    description: req.body.description,
    quantity: req.body.quantity,
    price: req.body.price,
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//TODO update product route 'put route'
router.put("/:id", (req, res) => {
  // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((dbProductData) => {
      if (!dbProductData[0]) {
        res.status(404).json({ message: "No product found with this id" });
        return;
      }
      res.json(dbProductData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//TODO delete product route 'delet route'
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      const deletedProduct = await product.destroy();
      res.status(200).send(deletedProduct);
    } else {
      res.status(404).send({
        message: "Product not found",
      });
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/charge", (req, res) => {
  const amount = 2500;

  stripe.customers
    .create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken,
    })
    .then((customer) =>
      stripe.charges.create({
        amount,
        description: "Test Test Test",
        currency: "usd",
        customer: customer.id,
      })
    )
    .then((charge) => res.render("success"));
});

// router.post("/charge", (req, res) => {
//   const amount = req.body.amount;

//   stripe.customers
//     .create({
//       email: req.body.stripeEmail,
//       source: req.body.stripeToken,
//     })
//     .then((customer) =>
//       stripe.charges.create({
//         amount,
//         description: "Sample Charge",
//         currency: "usd",
//         customer: customer.id,
//       })
//     )
//     .then((charge) => res.render("success", { amount }));
// });

module.exports = router;
