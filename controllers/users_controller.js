const db = require("../models");

//this is the users_controller.js file
exports.registration = (req, res) => {
  res.render("login", {
    layout: "main", // this is the layout file that will be used for the registration page (users/registration.ejs)
  });
};
// signOut with arrow functions
exports.signOut = (req, res) => {
  req.logout();
  res.redirect("/");
};

//login with arrow functions
exports.login = (req, res) => {
  res.render("login", {
    layout: "main",
  });
};

//register with arrow functions
// this will be the post route for the registration form on the registration page (users/registration.ejs)
//then it will redirect to the login page (users/login.ejs)
exports.register = (req, res) => {
  db.User.create(req.body).then((user) => {
    req.login(user, (err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/");
      }
    });
  });
};
