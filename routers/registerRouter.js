/**
 * @module routers/registerRouter
 */

// imports
const express = require("express");
const router = express.Router();
const { registerController } = require("../controllers");

/**
 * POST route for registering a new user.
 * Supports the following URL:
 * - /
 * @function
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
router.post("/", registerController);

module.exports = router;