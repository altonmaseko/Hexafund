const mongoose = require('mongoose');

const ApplicantSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    account_details: {
        type: Object,
        default: {
            account_active: { type: Boolean, default: true },
            reason: { type: String, default: "" },
            infractions: { type: Number, default: 0 }
        }
    },
    applications: {
        type: Array,
        default: []
    }
});

module.exports = mongoose.model("Applicant", ApplicantSchema);