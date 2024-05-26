/**
 * @module controllers/logoutController
 */

// imports
const { User } = require("../models");
const { asyncWrapper } = require("../middleware");

/**
 * Logout controller function.
 * @description Clears the JWT cookie and updates the refresh token for the user.
 * @function logoutController
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the logout process is complete.
 */
const logoutController = asyncWrapper(async (req, res) => {

    // Get the cookies from the request object
    const cookies = req.cookies;

    // If there are no cookies
    if (!cookies) {
        // Send a 204 No Content response with a message
        res.status(204).json({message: "Already logged out", status: 204});
        // End the middleware function
        return;
    } else {
        // If there's no JWT cookie
        if (!cookies.jwt) {
            // Send a 204 No Content response with a message
            res.status(204).json({message: "Already logged out", status: 204});
            // End the middleware function
            return;
        }
    }

    // Get the refresh token from the JWT cookie
    const refreshToken = cookies.jwt;

    // Try to find a user in the database with the provided refresh token
    const user = await User.findOne({ refreshToken: refreshToken }).exec();

    // If the user doesn't have a refresh token
    if (!user.refreshToken) {
        // Clear the JWT cookie
        res.clearCookie("jwt", { httpOnly: true });
        // Send a 204 No Content response with a message
        res.status(204).json({message: "Logged out successfully", status: 204});
        // End the middleware function
        return;
    }

    // If the user has a refresh token, clear it
    user.refreshToken = "";
    // Save the updated user document to the database
    await user.save();

    // Clear the JWT cookie
    res.clearCookie("jwt", { httpOnly: true });
    // Send a 200 OK response with a message
    res.status(200).json({message: "Logged out successfully", status: 200});
});

// Export the logout controller as a module
module.exports = logoutController;