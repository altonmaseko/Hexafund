const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email:{
        type: String
    },
    company: {
        type: String
    },
    role: {
        type: String,
        enum: ["fund manager", "applicant", "pending"],
        default: "applicant"
    },
    refreshToken: {
        type: String
    }
})

module.exports = mongoose.model("User", UserSchema)
