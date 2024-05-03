// imports
const express = require("express");
const router = express.Router();
const { logoutController } = require("../controllers");

router.get("/", logoutController);

module.exports = router;