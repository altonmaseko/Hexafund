// Import the mongoose module
const mongoose = require("mongoose");

/**
 * @description Asynchronously connects to the MongoDB database using the connection URI from the environment variables.
 * @returns {Promise<void>} A promise that resolves when the database connection is established.
 */
const connectDB = async () => {
    try {
        // Attempt to connect to the database
        await mongoose.connect(process.env.CONNECTION_URI)
    } catch (error) {
        // If an error occurred, log it to the console
        console.log(error);
    }
}

// Export the connectDB function as a module
module.exports = connectDB;