
const express = require("express");
const router = express.Router();
const { getAdmins, getApplicants, getFundingManagers, getUsers } = require("../controllers/userController");

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

module.exports = router;