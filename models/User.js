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
        enum: ["fund manager", "applicant", "pending", "admin"],
        default: "applicant"
    },
    refreshToken: {
        type: String
    }
});

module.exports = mongoose.model("User", UserSchema);