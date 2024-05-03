const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    funding_managers: { // Array of FundingManager emails
        type: Array,
        default: []
    },
    opportunities: {
        type: Array,
        default: []
    } // Array of FundingOpportunity IDs
});

module.exports = mongoose.model("Company", CompanySchema);