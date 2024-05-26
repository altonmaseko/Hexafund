/**
 * @module createControllers/createFundingController
 */

// Import the FundingOpportunity model from the models directory
const { FundingOpportunity } = require("../../models");

// Import the asyncWrapper middleware from the middleware directory
const { asyncWrapper } = require("../../middleware");

/**
 * Controller function to create a new funding opportunity.
 * 
 * @function createFundingController
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the funding opportunity is created.
 */
const createFundingController = asyncWrapper(async (req, res) => {
    console.log("create funding opportunity");

    // Extract the necessary information from the request body
    const { title,
        company_name,
        funding_manager_email,
        type, admin_status,
        funding_amount,
        available_slots,
        deadline,
        description, image_data } = req.body;

    // Validate that the required fields are provided
    if (!title || !company_name || !funding_manager_email || !type) {
        // If not, send a 400 Bad Request response with a message
        res.status(400).json({ message: "Please ensure you have entered the Title, Company Name, Funding Manager Email and Type", status: 400 });
        return;
    }

    // Check if a funding opportunity with the same title already exists
    const duplicateFundingOpportunity = await FundingOpportunity.findOne({ title: title }).exec();
    if (duplicateFundingOpportunity) {
        // If a duplicate is found, send a 409 Conflict response with a message
        res.status(409).json({ message: `The Funding Opportunity: '${duplicateFundingOpportunity.title}' already exists`, status: 409 })
        return
    }

    // Create a new funding opportunity record
    await FundingOpportunity.create({
        title: title,
        company_name: company_name,
        funding_manager_email: funding_manager_email,
        type: type,
        admin_status: admin_status,
        funding_amount: funding_amount,
        available_slots: available_slots,
        deadline: deadline,
        description: description,
        image_data: image_data
    });

    // Send a 201 Created response with a success message
    res.status(201).json({ message: `${title} has been successfully created.`, status: 201 });
});

// Export the createFundingController as a module
module.exports = createFundingController;