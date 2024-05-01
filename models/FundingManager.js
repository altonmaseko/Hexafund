const mongoose = require("mongoose");
const { roles } = require("../constants");

const FundingManagerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    account_details: {
        account_active: { type: Boolean, default: false },
        reason: { type: String, default: `Account pending approval from a ${roles.PLATFORM_ADMIN}` },
        infractions: { type: Number, default: 0 }
    }
});

module.exports = mongoose.model("Funding_Manager", FundingManagerSchema);