const mongoose = require('mongoose');

const mongoUri = process.env.CONNECTION_URI;

async function connectAndExit() {
    try {
        // Connect to MongoDB
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connected to MongoDB');

        // Define the user schema
        const userSchema = new mongoose.Schema({
            name: String,
            email: String,
            password: String,
            role : String
        });

        // Create a model based on the schema
        const User = mongoose.model('User', userSchema);

        // Create a new user
        const newUser = new User({
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123',
            role: 'APPLICANT'
        });

        // Save the user to the database
        await newUser.save();
        console.log('User created:', newUser);

        const queryFilter = { name: 'John Doe' }; // For example, find a user with name 'John Doe'
        const users = await User.find(queryFilter);
        console.log('Users found:', users);

        // Close the MongoDB connection
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

connectAndExit();
