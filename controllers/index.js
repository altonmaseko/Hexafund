// main controllers
const loginController = require("./loginController");
const registerController = require("./registerController");
const logoutController = require("./logoutController");
const refreshController = require("./refreshController");

// create controllers
const createFundingController = require("./createControllers/createFundingController");
const createApplicationController = require("./createControllers/createApplicationController")

// get controllers
const getUsersController = require("./getControllers/getUsersController");
const getFundingController = require("./getControllers/getFundingController");
const getApplicationsController = require("./getControllers/getApplicationsController")

// update controllers
const updateUsersController = require("./updateControllers/updateUsersController");
const updateFundingController = require("./updateControllers/updateFundingController");
const updateApplicationController = require("./updateControllers/updateApplicationController")

// delete controllers
const deleteUsersController = require("./deleteControllers/deleteUsersController");
const deleteFundingController = require("./deleteControllers/deleteFundingController");
const deleteApplicationController = require("./deleteControllers/deleteApplicationController")


module.exports = {
    // Auth
    loginController,
    logoutController,
    refreshController,
    registerController,
    // Create
    createFundingController,
    createApplicationController,
    // Get
    getUsersController,
    getFundingController,
    getApplicationsController,
    // Update
    updateUsersController,
    updateFundingController,
    updateApplicationController,
    // Delete
    deleteUsersController,
    deleteFundingController,
    deleteApplicationController,



};