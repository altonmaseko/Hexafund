/**
 * @module getControllers/getUsersController
 */

/**
 * Import required modules and models.
 */
const { asyncWrapper } = require("../../middleware"); // Import asyncWrapper middleware
const { roles } = require("../../constants"); // Import roles constant
const { Applicant, FundingManager, User } = require("../../models"); // Import Applicant, FundingManager, and User models

/**
 * Retrieves applicants based on the provided query parameters.
 * 
 * @function getApplicants
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
const getApplicants = asyncWrapper(async (req, res) => {

    // Fetch all applicants from the database
    let applicants = await Applicant.find({});

    // Extract the query parameters from the request
    const query = req.query; // when browser url is ...?property=value&property2=value

    // Log the query parameters for debugging purposes
    console.log(query);

    // If there are no query parameters, return all applicants
    if (Object.values(query).length <= 0) {
        res.status(200).json(applicants);
        return;
    }

    // For each query parameter
    for (let key in query) {
        // Filter the applicants based on the query parameter
        applicants = applicants.filter((applicant) => {

            // If the key includes a ".", it means we're accessing a nested property
            if (key.includes(".")) {
                // Split the key into its components
                const keys = key.split(".");
                console.log(keys);

                // If the applicant's property matches the query parameter, return the applicant
                if (applicant[keys[0]][keys[1]]?.toString() == query[key]) {
                    return applicant;
                }
            }
            // If the applicant's property matches the query parameter, return the applicant
            if (applicant[key]?.toString() === query[key]) {
                return applicant;
            }
        });
    }

    // Send a 200 OK response with the filtered applicants
    res.status(200).json(applicants);
});


/**
 * Retrieves funding managers based on the provided query parameters.
 * 
 * @function getFundingManagers
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
const getFundingManagers = asyncWrapper(async (req, res) => {

    // Fetch all funding managers from the database
    let fundingManagers = await FundingManager.find({});

    // Extract the query parameters from the request
    const query = req.query;

    // Log the query parameters for debugging purposes
    console.log(query);

    // If there are no query parameters, return all funding managers
    if (Object.values(query).length <= 0) {
        res.status(200).json(fundingManagers);
        return;
    }

    // For each query parameter
    for(let key in query) {
        // Filter the funding managers based on the query parameter
        fundingManagers = fundingManagers.filter((fundingManager) => {

            // If the key includes a ".", it means we're accessing a nested property
            if (key.includes(".")) {
                // Split the key into its components
                const keys = key.split(".");
                console.log(keys);

                // If the funding manager's property matches the query parameter, return the funding manager
                if (fundingManager[keys[0]][keys[1]]?.toString() == query[key]) {
                    return fundingManager;
                }
            }
            // If the funding manager's property matches the query parameter, return the funding manager
            if (fundingManager[key]?.toString() === query[key]) {
                return fundingManager;
            }
        });
    }

    // Send a 200 OK response with the filtered funding managers
    res.status(200).json(fundingManagers);
});

/**
 * Retrieves admins based on the provided query parameters.
 * 
 * @function getAdmins
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
const getAdmins = asyncWrapper(async (req, res) => {

    // Fetch all admins from the database
    let admins = await User.find({ role: roles.ADMIN });

    // Extract the query parameters from the request
    const query = req.query;

    // Log the query parameters for debugging purposes
    console.log(query);

    // If there are no query parameters, return all admins
    if (Object.values(query).length <= 0) {
        res.status(200).json(admins);
        return;
    }

    // For each query parameter
    for(let key in query) {
        // Filter the admins based on the query parameter
        admins = admins.filter((admin) => {

            // If the key includes a ".", it means we're accessing a nested property
            if (key.includes(".")) {
                // Split the key into its components
                const keys = key.split(".");
                console.log(keys);

                // If the admin's property matches the query parameter, return the admin
                if (admin[keys[0]][keys[1]]?.toString() == query[key]) {
                    return admin;
                }
            }
            // If the admin's property matches the query parameter, return the admin
            if (admin[key]?.toString() === query[key]) {
                return admin;
            }
        });
    }

    // Send a 200 OK response with the filtered admins
    res.status(200).json(admins);
});

/**
 * Get all users.
 *
 * @function getUsers
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the users are fetched.
 */
const getUsers = asyncWrapper(async (req, res) => {

    // Fetch all users from the database and sort them by role
    const users = await User.find({}).sort({ role: 1 });

    // Send a 200 OK response with the users
    res.status(200).json(users);
});

module.exports = { 
    getApplicants, 
    getAdmins, 
    getFundingManagers, 
    getUsers 
};