const express = require("express");
const router = express.Router();
const { getFundingController, 
    createFundingController,
    updateFundingController, 
    deleteFundingController } = require("../controllers");

// GET
router.get([
    "/funding-opportunities",
    "/funding-opportunity"], getFundingController);

// UPDATE
router.put([
    "/funding-opportunities/:funding_opportunity_id",
    "/funding-opportunity/:funding_opportunity_id"], updateFundingController);

// DELETE
router.delete([
    "/funding-opportunities/:funding_opportunity_id",
    "/funding-opportunity/:funding_opportunity_id"], deleteFundingController);

// CREATE
router.post([
    "/funding-opportunities",
    "/funding-opportunity"], createFundingController);

module.exports = router;