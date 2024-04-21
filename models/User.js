// imports
const { PLATFORM_ADMIN, FUNDING_MANAGER, APPLICANT } = require("../constants/roles");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: [PLATFORM_ADMIN, FUNDING_MANAGER, APPLICANT],
        default: APPLICANT
    },
    refreshToken: {
        type: String
    }
});

module.exports = mongoose.model("User", UserSchema);