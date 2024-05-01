const express = require("express");
const router = express.Router();
const {getFunding} = require("../controllers/getFundingController")
const {updateFunding} = require("../controllers/updateFundingController")
const {deleteFunding} = require("../controllers/deleteFundingController")
const {createFundingOpportunity} = require("../controllers/createFundingController")

// GET
router.get([
    "/funding-opportunities",
    "/funding-opportunity"], getFunding);

// UPDATE
router.put([
    "/funding-opportunities/:funding_opportunity_id",
    "/funding-opportunity/:funding_opportunity_id"], updateFunding);

// DELETE
router.delete([
    "/funding-opportunities/:funding_opportunity_id",
    "/funding-opportunity/:funding_opportunity_id"], deleteFunding);

// CREATE
router.post([
    "/funding-opportunities",
    "/funding-opportunity"], createFundingOpportunity);

module.exports = router;