// Dependencies
// ============
const express = require("express");
const path = require("path");
const logger = require("morgan");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
// const passport = require("./config/passport");
const config = require("./config/extra-config");
const compression = require("compression");
const { sequelize } = require("./models");
const exphbs = require("express-handlebars");
const db = require("./models");

//put on port 3001 for heroku
const PORT = process.env.PORT || 3001;

// Express settings
// ================

// instantiate our app
const app = express();

//allow sessions
app.use(
  session({
    secret: config.sessionKey,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize,
    }),
  })
);

app.get("/", (req, res) => {
  res.render("index");
});

//get route for products
//app.get("/", (req, res) => {
//res.render("index");
//});

//app.get("/products", (req, res) => {
//res.render("products");
//});

// view engine setup
app.set("views", path.join(__dirname, "views"));

//set up handlebars

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

// const isAuth = require("./config/middleware/isAuthenticated");
// const authCheck = require("./config/middleware/attachAuthenticationStatus");

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({ secret: config.sessionKey, resave: true, saveUninitialized: true })
);
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(authCheck);

app.use(compression());

// require("./routes")(app);
// const { User, Product, Order } = require('./models');

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: app.get("env") === "development" ? err : {},
  });
});

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
});

// our module get's exported as app.
module.exports = app;
