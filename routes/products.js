const express = require("express");
const router = express.Router();

const application_controller = require("../controllers/application_controller");

router.get("/", application_controller.index); //this will be the home page of the application
// and will be the first page that the user will see

module.exports = router;
