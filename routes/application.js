const express = require("express");
const router = express.Router();

const application_controller = require("../controllers/application_controller");

router.get("/", application_controller.index); //what is index in here ? // index is a function in application_controller.js
//will be called when the user goes to the root of the application (localhost:3000/)

module.exports = router;
