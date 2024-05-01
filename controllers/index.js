// main controllers
const loginController = require("./loginController");
const registerController = require("./registerController");
const logoutController = require("./logoutController");
const refreshController = require("./refreshController");
// const createFundingController = require("./createFundingController");

// get controllers
const getUsersController = require("./getUsersController");
// const getFundingController = require("./getFundingController");

// update controllers
const updateUsersController = require("./updateUsersController");
// const updateFundingController = require("./updateFundingController");

// delete controllers
const deleteUsersController = require("./deleteUsersController");
// const deleteFundingController = require("./deleteFundingController");

module.exports = {
    loginController,
    registerController,
    logoutController,
    refreshController,
    //createFundingController,
    getUsersController,
    //getFundingController,
    updateUsersController,
    //updateFundingController,
    deleteUsersController/*,
    deleteFundingController*/
};