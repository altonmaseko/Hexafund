const mongoose = require("mongoose");

/**
 * Represents a company in the funding website.
 *
 * @class Company
 * @property {string} name - The name of the company.
 * @property {Array<string>} funding_managers - An array of funding manager emails associated with the company.
 * @property {Array<string>} opportunities - An array of funding opportunity IDs associated with the company.
 */
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