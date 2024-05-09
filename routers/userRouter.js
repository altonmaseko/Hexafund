// imports
const express = require("express");
const router = express.Router();
const { getUsersController, 
    updateUsersController, deleteUsersController } = require("../controllers");

const { getAdmins, getApplicants, getFundingManagers, getUsers } = getUsersController;
const { updateApplicants, updateFundingManagers } = updateUsersController;
const { selfDeleteUser } = deleteUsersController;

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

// DELETE
router.delete("/delete", selfDeleteUser);

module.exports = router;