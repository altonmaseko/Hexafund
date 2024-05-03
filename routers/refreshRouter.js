// imports
const express = require("express");
const router = express.Router();
const { refreshController } = require("../controllers");

router.get("/", refreshController);

module.exports = router;