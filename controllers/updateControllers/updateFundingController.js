/**
 * @module updateControllers/updateFundingController
 */

// Import the asyncWrapper middleware and the FundingOpportunity model
const { asyncWrapper } = require("../../middleware");
const { FundingOpportunity } = require("../../models");

/**
 * Controller function to update a funding opportunity.
 * 
 * @function updateFundingController
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the update is complete.
 */
const updateFundingController = asyncWrapper(async (req, res) => {

    // Extract the funding_opportunity_id from the request parameters
    const { funding_opportunity_id } = req.params;

    // Extract the request body
    const body = req.body;

    // If the funding_opportunity_id is not provided in the URL, return a 400 Bad Request response
    if (!funding_opportunity_id) {
        res.status(400).json({ message: "Please include funding_opportunity_id in url. e.g: api/v1/fundingOpportunity/example_id", status: 400 });
        return;
    }

    // If the request body is empty, return a 400 Bad Request response
    if (Object.keys(body).length <= 0) {
        res.status(400).json({ message: "Please include a body of the properties you want to modify", status: 400 });
        return;
    }

    // Update the funding opportunity with the provided ID using the properties in the request body
    await FundingOpportunity.updateOne({ _id: funding_opportunity_id }, { $set: body });

    // Send a 200 OK response with a success message and the updated data
    res.status(200).json({ message: "Successfully updated", success: true, data: body });
});

// Export the updateFundingController function
module.exports = updateFundingController;