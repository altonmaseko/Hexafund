/**
 * @module routers/refreshRouter
 */

// imports
const express = require("express");
const router = express.Router();
const { refreshController } = require("../controllers");

/**
 * GET route for refreshing an access token.
 * Supports the following URL:
 * - /
 * @function
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
router.get("/", refreshController);

module.exports = router;