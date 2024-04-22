const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        // await mongoose.connect("mongodb://localhost:27017/FundingRequestsManagement"); //TEMPORARY LOCAL DATABASE
        await mongoose.connect(process.env.CONNECTION_URI); //PRODUCTION DATABASE
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;