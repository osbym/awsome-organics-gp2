const path = require("path");
const express = require("express");
const stripe = require("stripe")(
  "sk_test_51KGGcjDQw3iOHoMjf3YITBwKINTnXK3bur0cgCPuh60dD993ZmOU4Tqoy33u52gPG3usHBJpeZnvJBHuQtUxRK5O00WkMZpfof"
);
const bodyParser = require("body-parser");
const session = require("express-session");
const exphbs = require("express-handlebars");
const helpers = require("./utils/helpers");

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/connection");

const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
    //if idle time is greater than 30 minutes, the session will be destroyed
    expiration: 30 * 60 * 1000,
  }),
};
//connection to DB and setting up handlebars
app.use(session(sess));
const hbs = exphbs.create({ helpers }); //creates handlebars
app.engine("handlebars", hbs.engine); // sets up handlebars
app.set("view engine", "handlebars"); //sets up handlebars
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//for some reason its not taking the req.body from the form here.
//I can put in a set amount of money and it will work.

app.post("/charge", (req, res) => {
  const amount = req.body.amount;
  stripe.customers
    .create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken,
    })
    .then((customer) => {
      stripe.charges.create({
        amount,
        description: "Sample Charge",
        currency: "usd",
        customer: customer.id,
      });

      res.render("success", { amount });
    });
});

app.use(require("./controllers/"));
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
  sequelize.sync({ force: false });
});
