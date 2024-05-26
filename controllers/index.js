/**
 * Module containing all the controllers for the application.
 */


// auth controllers
/**
 * Controller for handling user login.
 * @type {function}
 */
const loginController = require("./loginController");

/**
 * Controller for handling user registration.
 * @type {function}
 */
const registerController = require("./registerController");

/**
 * Controller for handling user logout.
 * @type {function}
 */
const logoutController = require("./logoutController");

/**
 * Controller for handling refresh token logic.
 * @type {function}
 */
const refreshController = require("./refreshController");


// create controllers
/**
 * Controller for creating a new funding request.
 * @type {function}
 */
const createFundingController = require("./createControllers/createFundingController");

/**
 * Controller for creating a new application.
 * @type {function}
 */
const createApplicationController = require("./createControllers/createApplicationController");


// get controllers
/**
 * Controller for retrieving a list of users.
 * @type {function}
 */
const getUsersController = require("./getControllers/getUsersController");

/**
 * Controller for retrieving a list of funding requests.
 * @type {function}
 */
const getFundingController = require("./getControllers/getFundingController");

/**
 * Controller for retrieving a list of applications.
 * @type {function}
 */
const getApplicationsController = require("./getControllers/getApplicationsController");


// update controllers
/**
 * Controller for updating user information.
 * @type {function}
 */
const updateUsersController = require("./updateControllers/updateUsersController");

/**
 * Controller for updating a funding request.
 * @type {function}
 */
const updateFundingController = require("./updateControllers/updateFundingController");

/**
 * Controller for updating an application.
 * @type {function}
 */
const updateApplicationController = require("./updateControllers/updateApplicationController");


// delete controllers
/**
 * Controller for deleting a user.
 * @type {function}
 */
const deleteUsersController = require("./deleteControllers/deleteUsersController");

/**
 * Controller for deleting a funding request.
 * @type {function}
 */
const deleteFundingController = require("./deleteControllers/deleteFundingController");

/**
 * Controller for deleting an application.
 * @type {function}
 */
const deleteApplicationController = require("./deleteControllers/deleteApplicationController");

// Export the controllers
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