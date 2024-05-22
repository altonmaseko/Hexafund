const mongoose = require("mongoose");
const { roles } = require("../constants");

/**
 * Represents the schema for the Funding Manager.
 *
 * @class FundingManager
 * @property {string} name - The name of the funding manager.
 * @property {string} email - The email of the funding manager.
 * @property {string} company - The company of the funding manager.
 * @property {Object} account_details - The account details of the funding manager.
 * @property {boolean} account_details.account_active - Indicates if the account is active or not.
 * @property {string} account_details.reason - The reason for the account status.
 * @property {number} account_details.infractions - The number of infractions associated with the account.
 */
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