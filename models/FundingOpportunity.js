const mongoose = require("mongoose");
const { statuses, fund_types } = require("../constants");

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
    admin_status: {
        type: String,
        enum: [statuses.PENDING, statuses.ACCEPTED, statuses.REJECTED],
        default: statuses.PENDING
    },
    type: {
        type: String,
        enum: [fund_types.EDUCATIONAL, fund_types.BUSINESS, fund_types.EVENT],
        required: true
    },
    funding_opportunity_id: {
        type: mongoose.Schema.Types.ObjectId, // Use ObjectId type
        index: true, // Optional: Add an index for faster lookups
        auto: true // Automatically generate an ObjectId
    }

    /*
    // Features to be added later
    funding_amount: {
        type: Number,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: [statuses.ACTIVE, statuses.INACTIVE],
        default: statuses.ACTIVE
    }
    */
    //funding_amount history will be added later
});

module.exports = mongoose.model("Funding_Opportunity", FundingOpportunitySchema);