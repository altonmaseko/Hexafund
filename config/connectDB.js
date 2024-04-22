const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        if (process.env.NODE_ENV === "development") {
            await mongoose.connect("mongodb://localhost:27017/FundingRequestsManagement");
        }else{
            await mongoose.connect(process.env.CONNECTION_URI); //PRODUCTION DATABASE
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;