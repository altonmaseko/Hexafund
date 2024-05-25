/**
 * @module routers/userRouter
 */

// Import the express module
const express = require("express");

// Create a new router object
const router = express.Router();

// Import the user controllers
const { 
    getUsersController, // Controller to get users
    updateUsersController, // Controller to update users
    deleteUsersController // Controller to delete users
} = require("../controllers");

// Destructure the controller functions
const { getAdmins, getApplicants, getFundingManagers, getUsers } = getUsersController;
const { updateApplicants, updateFundingManagers } = updateUsersController;
const { selfDeleteUser } = deleteUsersController;

/**
 * GET route for retrieving a list of platform administrators.
 * Supports the following URLs:
 * - /admin
 * - /platform_admin
 * - /platform-admin
 * @function
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
router.get(["/admin", "/platform_admin", "/platform-admin"], getAdmins);

/**
 * GET route for retrieving a list of funding managers.
 * Supports the following URLs:
 * - /funding_managers
 * - /funding-managers
 * - /fund_managers
 * - /fund-managers
 * - /fundingmanagers
 * - /fund
 * @function
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
router.get([
    "/funding_managers",
    "/funding-managers",
    "/fund_managers",
    "/fund-managers",
    "/fundingmanagers",
    "/fund"], getFundingManagers);

/**
 * GET route for retrieving a list of applicants.
 * Supports the following URLs:
 * - /applicant
 * - /applicants
 * @function
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
router.get(["/applicant", "/applicants"], getApplicants);

/**
 * GET route for retrieving a list of all users.
 * Supports the following URLs:
 * - /user
 * - /users
 * @function
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
router.get(["/user", "/users"], getUsers);

/**
 * PUT route for updating a funding manager.
 * Supports the following URLs:
 * - /funding_managers/:email
 * - /funding-managers/:email
 * - /fund_managers/:email
 * - /fund-managers/:email
 * - /fundingmanagers/:email
 * - /fund/:email
 * @function
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
router.put([
    "/funding_managers/:email",
    "/funding-managers/:email",
    "/fund_managers/:email",
    "/fund-managers/:email",
    "/fundingmanagers/:email",
    "/fund/:email"], updateFundingManagers);

/**
 * PUT route for updating an applicant.
 * Supports the following URLs:
 * - /applicant/:email
 * - /applicants/:email
 * @function
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
router.put(["/applicant/:email", "/applicants/:email"], updateApplicants);

/**
 * DELETE route for a user to delete their own account.
 * Supports the following URL:
 * - /delete
 * @function
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
router.delete("/delete", selfDeleteUser);

module.exports = router;