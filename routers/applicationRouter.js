const express = require("express");
const router = express.Router();
const { getApplicationsController,
    createApplicationController,
    updateApplicationController,
    deleteApplicationController } = require("../controllers");


// GET
router.get([
    "/applications",
    "/application"], getApplicationsController);

// UPDATE
router.put([
    "/applications/:application_id",
    "/application/:application_id"], updateApplicationController);

// DELETE
router.delete([
    "/applications/:application_id",
    "/application/:application_id"], deleteApplicationController);

// CREATE
router.post([
    "/applications",
    "/application"], createApplicationController);





module.exports = router;