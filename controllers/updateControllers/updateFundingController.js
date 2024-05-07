const { asyncWrapper } = require("../../middleware");
const { FundingOpportunity } = require("../../models");

const updateFundingController = asyncWrapper(async (req, res) => {

    const { funding_opportunity_id } = req.params;
    const body = req.body;

    if (!funding_opportunity_id) {
        res.status(400).json({ message: "Please include funding_opportunity_id in url. e.g: api/v1/ad/example_id", status: 400 });
        return;
    }

    if (Object.keys(body).length <= 0) {
        res.status(400).json({ message: "Please include a body of the properties you want to modify", status: 400 });
        return;
    }

    await FundingOpportunity.updateOne({ _id: funding_opportunity_id }, { $set: body });

    res.status(200).json({ message: "successfully updated", success: true, data: body });
});

module.exports = updateFundingController;