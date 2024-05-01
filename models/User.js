// imports
const { roles } = require("../constants");
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
        enum: [roles.PLATFORM_ADMIN, roles.FUNDING_MANAGER, roles.APPLICANT],
        default: roles.APPLICANT
    },
    refreshToken: {
        type: String
    }
});

module.exports = mongoose.model("User", UserSchema);