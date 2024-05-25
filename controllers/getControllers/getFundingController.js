/**
 * @module getControllers/getFundingController
 */

// Import the asyncWrapper middleware from the middleware directory
const { asyncWrapper } = require("../../middleware");

// Import the FundingOpportunity model from the models directory
const { FundingOpportunity } = require("../../models");

/**
 * Retrieves funding opportunities based on the provided query parameters.
 * 
 * @function getFundingController
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
const getFundingController = asyncWrapper(async (req, res) => {

    // Fetch all funding opportunities from the database
    let fundingOpportunities = await FundingOpportunity.find({});

    // Extract the query parameters from the request
    const query = req.query; // when browser url is ...?property=value&property2=value

    // Log the query parameters for debugging purposes
    console.log(query);

    // If there are no query parameters, return all funding opportunities
    if (Object.values(query).length <= 0) {
        res.status(200).json(fundingOpportunities);
        return;
    }

    // For each query parameter
    for (let key in query) {
        // Filter the funding opportunities based on the query parameter
        fundingOpportunities = fundingOpportunities.filter((fundingOpportunity) => {

            // If the funding opportunity has no available slots, skip it
            if (fundingOpportunity.available_slots <= 0) {
                return
            }

            // If the key includes a ".", it means we're accessing a nested property
            if (key.includes(".")) {
                // Split the key into its components
                const keys = key.split(".");
                console.log(keys);

                // If the funding opportunity's property matches the query parameter, return the funding opportunity
                if (fundingOpportunity[keys[0]][keys[1]]?.toString() == query[key]) {
                    return fundingOpportunity;
                }
            }
            // If the funding opportunity's property matches the query parameter, return the funding opportunity
            if (fundingOpportunity[key]?.toString() === query[key]) {
                return fundingOpportunity;
            }
        });
    }

    // Send a 200 OK response with the filtered funding opportunities
    res.status(200).json(fundingOpportunities);
});

// Export the getFundingController as a module
module.exports = getFundingController;