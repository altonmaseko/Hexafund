/**
 * @module controllers/refreshController
 */

// imports
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { asyncWrapper } = require("../middleware");

/**
 * Handles the refresh token logic for authentication.
 * @function refreshController
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the refresh token logic is completed.
 */
const refreshController = asyncWrapper(async (req, res) => {
    // Check if the refresh token is present in the cookies
    const cookies = req.cookies;
    try{
        if (!cookies || !cookies.jwt) {
            // If the refresh token is not present, the user is unauthorized and cannot access the resource
            res.status(401).json({ message: "You are unauthorized from accessing this resource", status: 401 });
            return;
        }
    }
    catch(e){
        console.log(e);
        res.status(500).json({ message: `${e}`, status: 500 });
        return;
    }

    // Retrieve the refresh token from the cookies
    const refreshToken = cookies.jwt;

    // Find the user associated with the refresh token
    const user = await User.find({ refreshToken: refreshToken });
    if (!user) {
        // If no user is found with the given refresh token, the user is forbidden from accessing the resource
        res.status(403).json({ message: "You are forbidden from accessing this resource.", status: 403 });
        return;
    }

    // Verify the refresh token
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || decoded.name !== user.name) {
                // If there's an error verifying the token or the name stored in the token doesn't match the user's name,
                // the user is forbidden from accessing the resource
                res.status(403).json({ message: "You are forbidden from accessing this resource.", status: 403 });
                return;
            }

            // Create a new access token with the user's information
            const accessToken = jwt.sign(
                {
                    userInfo: {
                        name: decoded.name,
                        email: user.email
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "60s" }
            );

            // Store the user's information in the request object
            req.userInfo = {
                name: decoded.name,
                email: user.email
            };

            // Send the new access token as the response
            res.json({ accessToken });
        }
    );
});

// Export the refreshController as a module
module.exports = refreshController;