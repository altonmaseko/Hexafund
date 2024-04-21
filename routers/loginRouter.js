// imports
const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");

router.post("/", loginController);

module.exports = router;