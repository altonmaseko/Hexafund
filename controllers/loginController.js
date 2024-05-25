/**
 * @module controllers/loginController
 */

//imports
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { asyncWrapper } = require("../middleware");
const { User } = require("../models");

/**
 * Handles the login functionality.
 * @function loginController
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the login process is complete.
 */
const loginController = asyncWrapper(async (req, res) => {

    // Destructure the email and password from the request body
    const { email, password } = req.body;

    // If either the email or password is missing
    if (!email || !password) {
        // Send a 400 Bad Request response with a message
        res.status(400).json({ message: "Please enter email AND password", status: 400 });
        // End the middleware function
        return;
    }

    // Try to find a user in the database with the provided email and password
    let user = await User.findOne({ email: email, password: password }).exec();

    // If no user was found
    if (!user) {
        // Send a 404 Not Found response with a message
        res.status(404).json({message: "Invalid email or password", status: 404}); //404: user not found
        // End the middleware function
        return;
    }

    //create access and refresh tokens

    // Get the user's name from the user object
    const name = user.name;

    // Generate an access token using the user's name and email, the access token secret, and an expiration time of 30 minutes
    const accessToken = jwt.sign(
        {
            userInfo: {
                name, // The user's name
                email // The user's email
            }
        },
        process.env.ACCESS_TOKEN_SECRET, // The secret used to sign the access token
        { expiresIn: "1800s" } // The expiration time of the access token (1800 seconds = 30 minutes)
    );

    // Generate a refresh token using the user's name, the refresh token secret, and an expiration time of 1 day
    const refreshToken = jwt.sign(
        { name }, // The payload of the refresh token (the user's name)
        process.env.REFRESH_TOKEN_SECRET, // The secret used to sign the refresh token
        { expiresIn: "1d" } // The expiration time of the refresh token (1 day)
    );

    // Update the user's document in the database to store the refresh token
    await User.updateOne({ email: email }, { refreshToken: refreshToken });

    // Set a cookie named "jwt" with the refresh token, which is HTTP-only and expires after 24 hours
    res.cookie("jwt", refreshToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 }); //24 hours in milliseconds

    // Send a 200 OK response with the access token and the user's name
    res.status(200).json({ accessToken: accessToken, name:user.name });

});

// Export the loginController function as a module
module.exports = loginController;