// Import Express and Axios
const express = require('express');
const axios = require('axios');

// Create an instance of an Express app
const app = express();

// Define a route handler for the `/index` endpoint
app.get('/index', (req, res) => {
    // Determine the base URL based on the environment
    if (process.env.NODE_ENV === 'development') {
        axios.defaults.baseURL = 'http://localhost:3000/';
    } else {
        axios.defaults.baseURL = 'https://funding-website.azurewebsites.net/';
    }

    // Get the current environment from process.env.NODE_ENV
    const currentEnvironment = process.env.NODE_ENV || 'not set';

    // Send a response with the current environment
    res.send(`The current environment is: ${currentEnvironment} 
    with ${axios.defaults.baseURL} as the base URL`);
});

// Define the port on which the app will listen
const PORT = process.env.PORT || 3000;

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
