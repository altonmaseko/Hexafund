/**
 * Router for handling funding opportunity-related routes.
 * @module routers/fundingOpportunityRouter
 */

// Import the express module
const express = require("express");

// Create a new router object
const router = express.Router();

// Import the funding opportunity controllers
const { 
    getFundingController, // Controller to get funding opportunities
    createFundingController, // Controller to create a new funding opportunity
    updateFundingController, // Controller to update an existing funding opportunity
    deleteFundingController // Controller to delete an existing funding opportunity
} = require("../controllers");

/**
 * GET route for retrieving a list of funding opportunities.
 * Supports the following URLs:
 * - /funding-opportunities
 * - /funding-opportunity
 * @function
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
router.get([
    "/funding-opportunities",
    "/funding-opportunity"], getFundingController);

/**
 * PUT route for updating a funding opportunity.
 * Supports the following URLs:
 * - /funding-opportunities/:funding_opportunity_id
 * - /funding-opportunity/:funding_opportunity_id
 * @function
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
router.put([
    "/funding-opportunities/:funding_opportunity_id",
    "/funding-opportunity/:funding_opportunity_id"], updateFundingController);

/**
 * DELETE route for deleting a funding opportunity.
 * Supports the following URLs:
 * - /funding-opportunities/:funding_opportunity_id
 * - /funding-opportunity/:funding_opportunity_id
 * @function
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
router.delete([
    "/funding-opportunities/:funding_opportunity_id",
    "/funding-opportunity/:funding_opportunity_id"], deleteFundingController);

/**
 * POST route for creating a new funding opportunity.
 * Supports the following URLs:
 * - /funding-opportunities
 * - /funding-opportunity
 * @function
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
router.post([
    "/funding-opportunities",
    "/funding-opportunity"], createFundingController);

module.exports = router;