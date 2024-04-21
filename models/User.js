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
        enum: ["Funding Manager", "Applicant", "Pending"],
        default: "Applicant"
    },
    refreshToken: {
        type: String
    }
});

module.exports = mongoose.model("User", UserSchema);