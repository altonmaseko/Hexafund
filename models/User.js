// imports
const { roles } = require("../constants");
const mongoose = require("mongoose");

/**
 * User Schema
 * @class User 
 * @property {string} name - The name of the user.
 * @property {string} email - The email of the user.
 * @property {string} password - The password of the user.
 * @property {string} role - The role of the user. Can be one of: PLATFORM_ADMIN, FUNDING_MANAGER, APPLICANT.
 * @property {string} refreshToken - The refresh token of the user.
 */
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