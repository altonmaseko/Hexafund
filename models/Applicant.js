const mongoose = require('mongoose');

/**
 * Represents an applicant.
 * @class Applicant
 * @property {String} name - The name of the applicant.
 * @property {String} email - The email of the applicant.
 * @property {Object} account_details - The account details of the applicant.
 * @property {Boolean} account_details.account_active - The account active status of the applicant.
 * @property {String} account_details.reason - The reason for the account status.
 * @property {Number} account_details.infractions - The number of infractions.
 * @property {Array} applications - The applications made by the applicant.
 */
const ApplicantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    account_details: {
        account_active: { type: Boolean, default: true },
        reason: { type: String, default: "" },
        infractions: { type: Number, default: 0 }
    },
    applications: {
        type: Array,
        default: []
    }
});

module.exports = mongoose.model("Applicant", ApplicantSchema);
