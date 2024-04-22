const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        if (process.env.NODE_ENV === "development") {
            let connectionURI = "";
            if (process.env.MONGODB_ROOT_PASSWORD) {
                connectionURI = `mongodb://root:${process.env.MONGODB_ROOT_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}`;
            }else{
                connectionURI = "mongodb://localhost:27017/FundingRequestsManagement"
            }
            await mongoose.connect(connectionURI);
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;