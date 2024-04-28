const mongoose = require("mongoose");
const { fund_types } = require("../constants");

const FundingOpportunitySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    company_name: {
        type: String,
        required: true
    },
    funding_manager_email: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: [fund_types.EDUCATIONAL, fund_types.BUSINESS, fund_types.EVENT],
        required: true
    },
    funding_amount: {
        type: Number,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    }
    //funding_amount history will be added later
});

module.exports = mongoose.model("Funding_Opportunity", FundingOpportunitySchema);