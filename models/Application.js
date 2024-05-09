const mongoose = require("mongoose");
const { statuses } = require("../constants");

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