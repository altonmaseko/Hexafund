/**
 * @module deleteControllers/deleteFundingController
 **/
const { asyncWrapper } = require("../../middleware");
const { FundingOpportunity } = require("../../models");

/**
 * Controller function to delete a funding opportunity.
 * 
 * @function deleteFundingController
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the funding opportunity is deleted.
 */
const deleteFundingController = asyncWrapper(async (req, res) => {

    const { funding_opportunity_id } = req.params;

    if (!funding_opportunity_id) {
        res.status(400).json({ message: "Please include funding_opportunity_id in url. e.g: api/v1/ad/example_id", status: 400 });
        return;
    }

    await FundingOpportunity.deleteOne({ _id: funding_opportunity_id });

    res.status(200).json({ message: "successfully deleted", success: true });
});

module.exports = deleteFundingController;