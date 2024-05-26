/**
 * @module  updateControllers/updateUsersController
 */

// Import the asyncWrapper middleware
const { asyncWrapper } = require("../../middleware");

// Import the User, Applicant, and FundingManager models
const { User, Applicant, FundingManager } = require("../../models");

/**
 * Update applicants controller.
 * 
 * @function updateApplicants
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the updated applicant data.
 */
const updateApplicants = asyncWrapper(async (req, res) => {

    // Extract the email from the request parameters
    const { email } = req.params;

    // Extract the request body
    let body = req.body;

    // If the email is not provided in the URL, return a 400 Bad Request response
    if (!email) {
        res.status(400).json({ message: "Please include email in url. e.g: api/v1/applicant/example@gmail.com", status: 400 });
        return;
    }

    // If the request body is empty, return a 400 Bad Request response
    if (Object.keys(body).length <= 0) {
        res.status(400).json({ message: "Please include a body of the properties you want to modify", status: 400 });
        return;
    }

    // Find the applicant with the provided email
    const applicant = await Applicant.findOne({ email: email });

    // If the request body contains account_details, merge it with the existing account_details
    // to prevent overriding of the account_details object
    let newAccountDetails;
    if (body.account_details) {
        newAccountDetails = { ...applicant.account_details, ...body.account_details };
    }

    // If newAccountDetails is defined, set body.account_details to newAccountDetails
    if (newAccountDetails) {
        body.account_details = newAccountDetails;
    }

    // Update the applicant with the provided email using the properties in the request body
    await Applicant.updateOne({ email: email }, { $set: body });

    // Update the user with the provided email using the properties in the request body
    await User.updateOne({ email: email }, { $set: body });

    // Send a 200 OK response with a success message and the updated data
    res.status(200).json({ message: "successfully updated", success: true, data: body });
});

/**
 * Update funding managers.
 * @function updateFundingManagers
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the update is complete.
 */
const updateFundingManagers = asyncWrapper(async (req, res) => {

    // Extract email from request parameters
    const { email } = req.params;

    // Extract request body
    let body = req.body;

    // Check if email is provided in the request parameters
    if (!email) {
        // If not, return a 400 Bad Request response with an error message
        res.status(400).json({ message: "Please include email in url. e.g: api/v1/funding-manager/example@gmail.com", status: 400 });
        return;
    }

    // Check if the request body is empty
    if (Object.keys(body).length <= 0) {
        // If it is, return a 400 Bad Request response with an error message
        res.status(400).json({ message: "Please include a body of the properties you want to modify", status: 400 });
        return;
    }

    // Find the funding manager with the provided email
    const fundingManger = await FundingManager.findOne({ email: email });

    // Initialize a variable to hold the new account details
    let newAccountDetails;

    // If the request body includes account details
    if (body.account_details) {
        // Merge the existing account details with the new ones
        newAccountDetails = { ...fundingManger.account_details, ...body.account_details };
    }

    // If new account details were provided
    if (newAccountDetails) {
        // Update the account details in the request body
        body.account_details = newAccountDetails;
    }

    // Update the funding manager in the database
    await FundingManager.updateOne({ email: email }, { $set: body });

    // Update the user in the database (if the user exists)
    await User.updateOne({ email: email }, { $set: body }); // if the property doesnt exist in User, it won't add it

    // Return a 200 OK response with a success message and the updated data
    res.status(200).json({ message: "successfully updated", success: true, data: body });
});

// Export the updateApplicants and updateFundingManagers controllers
module.exports = { 
    updateApplicants, 
    updateFundingManagers 
};