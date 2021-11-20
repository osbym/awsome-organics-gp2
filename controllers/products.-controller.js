const db = require("../models");

//this is the function that is called when the user goes to the /products route
//it will render the products.handlebars file
exports.products = (req, res) => {
  db.Product.findAll({}).then(function (dbProduct) {
    res.render("products", {
      product: dbProduct,
    });
  });
};

//this is the function that is called when the user goes to the /products/create route
//it will render to the products.handlebars file
exports.create = (req, res) => {
  req.body.product.image = req.file.path; //this is the path to the image that was uploaded to the server by multer middleware in the products.handlebars file
  db.Product.create(req.body.product).then((dbPost) => res.json(dbPost));
};

//this is the function that is called when the user goes to the /products/:id route
//it will render to the products.handlebars file
exports.show = (req, res) => {
  db.Product.findOne({
    where: {
      id: req.params.id,
    },
  }).then((dbPost) => res.json(dbPost));
};
