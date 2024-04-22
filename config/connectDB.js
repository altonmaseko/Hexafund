const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        if (process.env.NODE_ENV === "development") {
            const connectionURI = `mongodb://root:${process.env.MONGODB_ROOT_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}`;
            await mongoose.connect(connectionURI);
        }else{
            await mongoose.connect(process.env.CONNECTION_URI); //PRODUCTION DATABASE
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;