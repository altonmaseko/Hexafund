/**
 * @module controllers/registerController
 */

/**
 * Notes for user creation:
 * 1. User creation requires a name, email and password.
 * 2. The email must be unique.
 * 3. Being a Funding Manager or an Applicant depends on whether a company name was provided
 * 4. If a user wishes to be a funding manager, the front end will force them to provide a company name.
 **/

// imports
const { User, Applicant, FundingManager, Company } = require("../models");
const { asyncWrapper } = require("../middleware");

/**
 * Handles the registration of a user.
 * @function registerController
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the registration is complete.
 */
const registerController = asyncWrapper(async (req, res) => {
    // Extract the necessary information from the request body
    const { name, email, password, company, role } = req.body;

    // Validate that the required fields are provided
    if (!name || !password || !email) {
        res.status(400).json({ message: "Please ensure you have entered your Name, Email and Password", status: 400 });
        return;
    }

    // Check if the email is already registered
    const duplicateUser = await User.findOne({ email: email }).exec();
    if (duplicateUser) {
        res.status(409).json({ message: `The email: '${duplicateUser.email}' is already taken :)`, status: 409 })
        return
    }

    // Based on whether a company name is provided, the user is registered as a Funding Manager or an Applicant
    if (company) {
        // Create a new user with the provided information and set the role to Funding Manager
        await User.create({
            name: name,
            email: email,
            password: password,
            role: role
        });
        // Create a new Funding Manager record with the provided information
        await FundingManager.create({
            name: name,
            email: email,
            company: company
        });

        // Check if the company already exists in the database
        const newCompany = await Company.findOne({ name: company }).exec();
        if (!newCompany) {
            // If the company does not exist, create a new company record
            await Company.create({
                name: company
            });
        }
        // Add the funding manager's email to the list of funding managers for the company
        await Company.updateOne({ name: company }, { $push: { funding_managers: email } });
    } else {
        // Create a new user with the provided information and set the role to Applicant
        await User.create({
            name: name,
            email: email,
            password: password
        });
        // Create a new Applicant record with the provided information
        await Applicant.create({
            name: name,
            email: email
        });
    }

    // Send a success response
    res.status(201).json({ message: `${email} has been successfully registered.`, status: 201 });
});

// Export the registerController as a module
module.exports = registerController;