/**
 * @module deleteControllers/deleteFundingController
 */

// Import the asyncWrapper middleware
const { asyncWrapper } = require("../../middleware");

// Import the FundingOpportunity model
const { FundingOpportunity } = require("../../models");

/**
 * Deletes a funding opportunity by its ID.
 * 
 * @function deleteFundingController
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the funding opportunity is deleted.
 */
const deleteFundingController = asyncWrapper(async (req, res) => {

    // Extract the funding_opportunity_id from the request parameters
    const { funding_opportunity_id } = req.params;

    // Check if the funding_opportunity_id is provided
    if (!funding_opportunity_id) {
        // If not, return a 400 Bad Request response with an error message
        res.status(400).json({ message: "Please include funding_opportunity_id in url. e.g: api/v1/ad/example_id", status: 400 });
        return;
    }

    // Delete the funding opportunity with the provided ID from the database
    await FundingOpportunity.deleteOne({ _id: funding_opportunity_id });

    // Return a 200 OK response with a success message
    res.status(200).json({ message: "successfully deleted", success: true });
});

// Export the deleteFundingController function
module.exports = deleteFundingController;