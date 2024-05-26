/**
 * @module middleware/verifyAccessToken
 */

// imports
const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * @description Middleware function to verify the access token.
 * The access token can be in the authorization header or in a cookie.
 * If no valid access token is found, an error response is sent.
 * @param {Object} req - The Express.js request object.
 * @param {Object} res - The Express.js response object.
 * @param {Function} next - The next middleware function in the stack.
 * @returns {void}
 */
const verifyAccessToken = async (req, res, next) => {

    // Get the Authorization header from the request
    const authHeader = req.headers.Authorization || req.headers.authorization;

    // Get the access token from the cookies
    let cookieAccessToken = req.cookies.accessToken;

    // Initialize a variable to hold the access token
    let accessToken;

    // If there's no authorization header
    if (!authHeader) {
        // If there's no access token cookie
        if (!cookieAccessToken) {
            // Send a 401 Unauthorized response
            res.status(401).json({ message: "You are unauthorized to access this resource", status: 401 });
            // End the middleware function
            return;
        }
    } else {
        // If there's an authorization header, ignore the cookie
        cookieAccessToken = undefined //using bearer
        // If the authorization header doesn't start with "Bearer"
        if (!authHeader.startsWith("Bearer")) {
            // Send a 403 Forbidden response
            res.status(403).json({ message: "You are forbidden from accessing this resource", status: 403 });
            // End the middleware function
            return;
        }
    }

    // If there's an authorization header
    if (authHeader) {
        // Split the header on the space character and take the second part (the token)
        accessToken = authHeader.split(" ")[1];
    }

    // If there's an access token in the cookies
    if (cookieAccessToken) {
        // Use the cookie access token
        accessToken = cookieAccessToken;
    }

    // Verify the access token using the jwt.verify function
    jwt.verify(
        // The access token to verify
        accessToken,
        // The secret used to sign the access token
        process.env.ACCESS_TOKEN_SECRET,
        // The callback to execute once the token is verified
        (err, decoded) => {
            // If there was an error verifying the token
            if (err) {
                // Send a 403 Forbidden response with a message
                res.status(403).json({ message: "You are forbidden from accessing this resource", status: 403 });
                // End the middleware function
                return;
            }

            // If the token was verified successfully, add the decoded user info to the request object
            req.userInfo = decoded.userInfo;
            // Call the next middleware function
            next();
        }
    );
}

// Export the verifyAccessToken function as a module
module.exports = verifyAccessToken;