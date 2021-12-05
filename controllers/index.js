const router = require("express").Router();
const api = require("./api/");
const homeroutes = require("./homeroutes");

router.use("/api", api);
router.use("/", homeroutes);

module.exports = router;
