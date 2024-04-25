const express = require("express");
const router = express.Router();
const { getAdmins, getApplicants, getFundingManagers, getUsers } = require("../controllers/getUsersController");
const { updateApplicants, updateFundingManagers } = require("../controllers/updateUsersController")

// GET
router.get(["/admin", "/platform_admin", "/platform-admin"], getAdmins);

router.get([
    "/funding_managers",
    "/funding-managers",
    "/fund_managers",
    "/fund-managers",
    "/fundingmanagers",
    "/fund"], getFundingManagers);

router.get(["/applicant", "/applicants"], getApplicants);

router.get("/user", getUsers) //get all users

// UPDATE
router.put([
    "/funding_managers/:email",
    "/funding-managers/:email",
    "/fund_managers/:email",
    "/fund-managers/:email",
    "/fundingmanagers/:email",
    "/fund/:email"], updateFundingManagers);

router.put(["/applicant/:email", "/applicants/:email"], updateApplicants);

module.exports = router;