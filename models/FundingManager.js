const mongoose = require("mongoose");

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
        reason: { type: String, default: "Your account is pending approval by a Platform Admin" },
        infractions: { type: Number, default: 0 }

    }
});

module.exports = mongoose.model("Funding_Manager", FundingManagerSchema);