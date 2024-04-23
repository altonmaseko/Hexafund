const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_URI);
        /*
        if (process.env.NODE_ENV === "development") {
            let connectionURI = "";
            if (process.env.CI) {
                connectionURI = `mongodb://127.0.0.1:27017/FundingRequestsManagement`;
            }else{
                connectionURI = "mongodb://localhost:27017/FundingRequestsManagement"
            }
            //mongodb://127.0.0.1:27017
            await mongoose.connect(connectionURI);
        }
        */
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;