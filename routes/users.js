const express = require("express");
const router = express.Router();

const users_controller = require("../controllers/users_controller");

// GET request for creating a User. NOTE This must come before route for id (i.e. display user).
router.get("/signup", users_controller.signup); // this is the signup page for users to create an account

router.get("/sign-out", users_controller.sign_out); // this is the sign-out page for users to sign out

router.post("/login", users_controller.login); // this is the login page for users to sign in to their account
// and this is the post request for creating a User after the signup page is submitted

router.post("/signup", users_controller.signup); // this is the post request for creating a User after the signup page is submitted

module.exports = router;
