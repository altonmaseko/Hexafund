/**
 * @module getControllers/getUsersController
 **/
const { asyncWrapper } = require("../../middleware");
const { roles } = require("../../constants");
const { Applicant, FundingManager, User } = require("../../models");

/**
 * Retrieves applicants based on the provided query parameters.
 * @function getApplicants
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
const getApplicants = asyncWrapper(async (req, res) => {

    let applicants = await Applicant.find({});

    const query = req.query; // when browser url is ...?property=value&property2=value
    console.log(query);

    if (Object.values(query).length <= 0) {
        res.status(200).json( applicants );
        return;
    }

    for(let key in query) {
        applicants = applicants.filter((applicant) => {
            if (key.includes(".")) {
                const keys = key.split(".");
                console.log(keys);

                if (applicant[keys[0]][keys[1]]?.toString() == query[key]) {
                    return applicant;
                }
            }
            if (applicant[key]?.toString() === query[key]) {
                return applicant;
            }
        });
    }

    res.status(200).json( applicants );
});


/**
 * Retrieves funding managers based on the provided query parameters.
 * @function getFundingManagers
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
const getFundingManagers = asyncWrapper(async (req, res) => {

    let fundingManagers = await FundingManager.find({});

    const query = req.query;
    console.log(query);

    if (Object.values(query).length <= 0) {
        res.status(200).json( fundingManagers );
        return;
    }

    for(let key in query) {
        fundingManagers = fundingManagers.filter((fundingManager) => {
            if (key.includes(".")) {
                const keys = key.split(".");
                console.log(keys);

                if (fundingManager[keys[0]][keys[1]]?.toString() == query[key]) {
                    return fundingManager;
                }
            }
            if (fundingManager[key]?.toString() === query[key]) {
                return fundingManager;
            }
        });
    }

    res.status(200).json( fundingManagers );
});

/**
 * Retrieves admins based on the provided query parameters.
 * If no query parameters are provided, returns all admins.
 *
 * @function getAdmins
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves to the response object.
 */
const getAdmins = asyncWrapper(async (req, res) => {

    const admins = await User.find({ role: roles.PLATFORM_ADMIN });

    const query = req.query;

    if (Object.values(query).length <= 0) {
        console.log(query);
        res.status(200).json( admins );
        return;
    }

    for(let key in query) {
        admins = admins.filter((admin) => {
            if (key.includes(".")) {
                const keys = key.split(".");
                console.log(keys);

                if (admin[keys[0]][keys[1]]?.toString() == query[key]) {
                    return admin;
                }
            }
            if (admin[key]?.toString() === query[key]) {
                return admin;
            }
        });
    }

    res.status(200).json( admins );
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

    const users = await User.find({});
    res.status(200).json( users );
});

module.exports = { 
    getApplicants, 
    getAdmins, 
    getFundingManagers, 
    getUsers 
};