const router = require("express").Router();
const { Product } = require("../../models/");

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

//TODO create product route 'post route
router.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body); //this will create a new product

    res.status(201).send(product);
  } catch (err) {
    res.status(400).send(err);
  }
});
//TODO update product route 'put route'
router.put("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id); //this is the id of the product that we are trying to update
    //then we are trying to update the product with the id that we are trying to update
    //if the product exists then we are going to update it with the new information that we are trying to update it with
    //if the product does not exist then we are going to send a 404 error
    if (product) {
      const updatedProduct = await product.update(req.body);
      res.status(200).send(updatedProduct);
    } else {
      res.status(404).send({
        message: "Product not found",
      });
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

//TODO delete product route 'delet route'
router.delete("/api/products/:id", async (req, res) => {
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

module.exports = router;
