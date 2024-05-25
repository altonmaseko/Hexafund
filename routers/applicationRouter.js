/**
 * Router for handling application-related routes.
 * @module routers/applicationRouter
 */

// Import the express module
const express = require("express");

// Create a new router object
const router = express.Router();

// Import the application controllers
const { 
    getApplicationsController, // Controller to get applications
    createApplicationController, // Controller to create a new application
    updateApplicationController, // Controller to update an existing application
    deleteApplicationController // Controller to delete an existing application
} = require("../controllers");

/**
 * GET route for retrieving a list of applications.
 * Supports the following URLs:
 * - /applications
 * - /application
 * @function
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
router.get([
    "/applications",
    "/application"], getApplicationsController);

/**
 * PUT route for updating an application.
 * Supports the following URLs:
 * - /applications/:application_id
 * - /application/:application_id
 * @function
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
router.put([
    "/applications/:application_id",
    "/application/:application_id"], updateApplicationController);

/**
 * DELETE route for deleting an application.
 * Supports the following URLs:
 * - /applications/:application_id
 * - /application/:application_id
 * @function
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
router.delete([
    "/applications/:application_id",
    "/application/:application_id"], deleteApplicationController);

/**
 * POST route for creating a new application.
 * Supports the following URLs:
 * - /applications
 * - /application
 * @function
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
router.post([
    "/applications",
    "/application"], createApplicationController);

module.exports = router;