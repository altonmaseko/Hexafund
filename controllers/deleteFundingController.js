const asyncWrapper = require("../middleware/asyncWrapper");

const { PLATFORM_ADMIN } = require("../constants/roles");

const FundingOpportunity = require("../models/FundingOpportunity")

const deleteFunding = asyncWrapper(async (req, res) => {

    const { funding_opportunity_id } = req.params;

    if (!funding_opportunity_id) {
        res.status(400).json({ message: "Please include funding_opportunity_id in url. e.g: api/v1/ad/example_id", status: 400 });
        return;
    }

    await FundingOpportunity.deleteOne({funding_opportunity_id});

    res.status(200).json({ message: "successfully deleted", success: true });
});

module.exports = { 
    deleteFunding,
};