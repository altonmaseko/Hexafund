/**
 * @module routers/logoutRouter
 */

// imports
const express = require("express");
const router = express.Router();
const { logoutController } = require("../controllers");

/**
 * GET route for user logout.
 * Supports the following URL:
 * - /
 * @function
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
router.get("/", logoutController);

module.exports = router;