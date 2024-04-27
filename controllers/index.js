// main controllers
const loginController = require("./loginController");
const registerController = require("./registerController");
const logoutController = require("./logoutController");
const refreshController = require("./refreshController");

// get controllers
const getUsersController = require("./getUsersController");
const getFundingOpportunitiesController = require("./getFundingOpportunitiesController");

// update controllers
const updateUsersController = require("./updateUsersController");
const updateFundingOpportunitiesController = require("./updateFundingOpportunitiesController");

// delete controllers
const deleteUsersController = require("./deleteUsersController");
const deleteFundingOpportunitiesController = require("./deleteFundingOpportunitiesController");

module.exports = {
    loginController,
    registerController,
    logoutController,
    refreshController,
    getUsersController,
    getFundingOpportunitiesController,
    updateUsersController,
    updateFundingOpportunitiesController,
    deleteUsersController,
    deleteFundingOpportunitiesController
};