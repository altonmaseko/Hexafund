const mongoose = require("mongoose");
const { statuses } = require("../constants");

/**
 * Represents an application.
 * @class Application
 * @property {String} applicant_email - The email of the applicant.
 * @property {ObjectId} funding_opportunity_id - The ID of the funding opportunity.
 * @property {String} status - The status of the application.
 * @property {String} reason - The reason for the application.
 * @property {String} contact_number - The contact number of the applicant.
 * @property {String} cv_data - The CV data of the applicant.
 * @property {String} application_form_data - The application form data of the applicant.
 * @property {String} other_data - Other data of the applicant.
 
 */
const ApplicationSchema = new mongoose.Schema({
    applicant_email: {
        type: String,
        required: true
    },
    funding_opportunity_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        enum: [statuses.PENDING, statuses.ACCEPTED, statuses.REJECTED],
        default: statuses.PENDING
    },
    reason: {
        type: String,
        required: true
    },
    contact_number: {
        type: String
    },
    cv_data: {
        type: String
    },
    application_form_data: {
        type: String
    },
    other_data: {
        type: String
    },
    // array of documents will be added later
});

module.exports = mongoose.model("Application", ApplicationSchema);