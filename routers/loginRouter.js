/**
 * @module routers/loginRouter
 */

// imports
const express = require("express");
const router = express.Router();
const { loginController } = require("../controllers");

/**
 * POST route for user login.
 * Supports the following URL:
 * - /
 * @function
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
router.post("/", loginController);

module.exports = router;