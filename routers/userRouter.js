
const express = require("express");
const router = express.Router();
const { getAdmins, getApplicants, getFundingManagers, getUsers } = require("../controllers/getUsersController");
const {updateApplicant, updateFundingManager} = require("../controllers/updateUsersController")

// GET
router.get(["/admin", "/platform_admin", "/platform-admin"], getAdmins);

router.get([
    "/funding_manager",
    "/funding-manager",
    "/fund_manager",
    "/fund-manager",
    "/fundingmanager",
    "/fund"], getFundingManagers);

router.get("/applicant", getApplicants);

router.get("/user", getUsers) //get all users

// UPDATE
router.put([
    "/funding_manager/:email",
    "/funding-manager/:email",
    "/fund_manager/:email",
    "/fund-manager/:email",
    "/fundingmanager/:email",
    "/fund/:email"], updateFundingManager);

router.put("/applicant/:email", updateApplicant);

module.exports = router;