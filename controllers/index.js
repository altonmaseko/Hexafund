// main controllers
const loginController = require("./loginController");
const registerController = require("./registerController");
const logoutController = require("./logoutController");
const refreshController = require("./refreshController");

// create controllers
const createFundingController = require("./createControllers/createFundingController");

// get controllers
const getUsersController = require("./getControllers/getUsersController");
const getFundingController = require("./getControllers/getFundingController");

// update controllers
const updateUsersController = require("./updateControllers/updateUsersController");
const updateFundingController = require("./updateControllers/updateFundingController");

// delete controllers
const deleteUsersController = require("./deleteControllers/deleteUsersController");
const deleteFundingController = require("./deleteControllers/deleteFundingController");

module.exports = {
    loginController,
    registerController,
    logoutController,
    refreshController,
    createFundingController,
    getUsersController,
    getFundingController,
    updateUsersController,
    updateFundingController,
    deleteUsersController,
    deleteFundingController
};