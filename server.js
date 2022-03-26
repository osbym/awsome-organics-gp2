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
  resave: true,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
    //if idle time is greater than 30 minutes, the session will be destroyed
    expiration: 30 * 60 * 1000,
  }),
};
//connection to DB and setting up handlebars

app.use(session(sess));
const hbs = exphbs.create({ helpers });

app.engine("handlebars", hbs.engine); // sets up handlebars
app.set("view engine", "handlebars"); //sets up handlebars
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //this is for parsing the body of the request extended: false means that it will only parse the body of the request as a string
app.use(express.static(path.join(__dirname, "public")));

//for some reason its not taking the req.body from the form here.
//I can put in a set amount of money and it will work.

// app.post("/charge", (req, res) => {
//   const amount = req.body.amount; //req.body.amount is coming from where? // req.body.amount is coming from the form in the front end

//   stripe.customers
//     .create({
//       email: req.body.stripeEmail,
//       source: req.body.stripeToken,
//     })
//     .then((customer) => {
//       stripe.charges.create({
//         amount,
//         description: "Sample Charge",
//         currency: "usd",
//         customer: customer.id,
//       });

//       res.render("success", { amount });
//     });
// });

app.use(require("./controllers/"));
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
  sequelize.sync({ force: false });
});

// const path = require("path");
// const express = require("express");
// const session = require("express-session");
// const exphbs = require("express-handlebars");
// const helpers = require("./utils/helpers");

// require("dotenv").config();

// const app = express();
// const PORT = process.env.PORT || 3001;

// const sequelize = require("./config/config");
// const SequelizeStore = require("connect-session-sequelize")(session.Store);

// const sess = {
//   secret: "Super secret secret",
//   cookie: {},
//   resave: false,
//   saveUninitialized: true,
//   store: new SequelizeStore({
//     db: sequelize,
//     expiration: 30 * 60 * 1000,
//   }),
// };

// // const sess = {
// // secret: process.env.SESSION_SECRET,
// //   secret: "Super secret secret",
// //   cookie: {},
// //   resave: false,
// //   saveUninitialized: true,
// //   store: new SequelizeStore({
// //     db: sequelize,
// //     //if idle time is greater than 30 minutes, the session will be destroyed
// //     expiration: 30 * 60 * 1000,
// //   }),
// // };
// app.use(session(sess));

// const hbs = exphbs.create({ helpers });

// app.engine("handlebars", hbs.engine);
// app.set("view engine", "handlebars");

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, "public")));

// app.use(require("./controllers/"));

// app.listen(PORT, () => {
//   console.log(`App listening on port ${PORT}!`);
//   sequelize.sync({ force: false });
// });
