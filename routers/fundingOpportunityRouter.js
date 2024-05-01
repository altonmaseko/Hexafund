const express = require("express");
const router = express.Router();
const {getFunding} = require("../controllers/getFundingController")
const {updateFunding} = require("../controllers/updateFundingController")
// GET

router.get([
    "/ads",
    "/ad"], getFunding);

// UPDATE
router.put([
    "/ads:funding_opportunity_id",
    "/ad:funding_opportunity_id"], updateFunding);

module.exports = router;