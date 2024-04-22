const mongoose = require('mongoose');

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