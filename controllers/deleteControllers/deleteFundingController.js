const { asyncWrapper } = require("../../middleware");
const { FundingOpportunity } = require("../../models");

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