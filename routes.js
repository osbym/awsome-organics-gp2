//will be called when the server starts up and will be passed the express app
module.exports = (app) => {
  const application = require("./routes/application"); //this is the application route
  const users = require("./routes/users"); //this is the users route
  const products = require("./routes/products"); //this is the products route
  const orders = require("./routes/orders"); //this is the orders route

  app.use("/", application); //this will be the root of the application (/) and will be handled by the application controller
  app.use("/users", users); // this will be the root of the users (/users) and will be handled by the users controller
  app.use("/products", products); //this will be the root of the products (/products) and will be handled by the products controller
  app.use("/orders", orders); //this will be the root of the orders (/orders) and will be handled by the orders controller
};
