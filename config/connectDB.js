const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        // await mongoose.connect("mongodb://localhost:27017/FundingWebsite") //TEMPORARY LOCAL DATABASE
        await mongoose.connect(process.env.CONNECTION_URI)
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB