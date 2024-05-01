const asyncWrapper = require("../middleware/asyncWrapper");

const { PLATFORM_ADMIN } = require("../constants/roles");

const FundingOpportunity = require("../models/FundingOpportunity")

const updateFunding = asyncWrapper(async (req, res) => {

    const { funding_opportunity_id } = req.params;

    if (!funding_opportunity_id) {
        res.status(400).json({ message: "Please include funding_opportunity_id in url. e.g: api/v1/ad/example_id", status: 400 });
        return;
    }

    if (Object.keys(req.body).length <= 0) {
        res.status(400).json({ message: "Please include a body of the properties you want to modify", status: 400 });
        return;
    }

    await FundingOpportunity.updateOne({funding_opportunity_id}, req.body);

    res.status(200).json({ message: "successfully updated", success: true, data: req.body });
});

module.exports = { 
    updateFunding,
};