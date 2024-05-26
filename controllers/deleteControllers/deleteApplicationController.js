/**
 * @module deleteControllers/deleteApplicationController
 */

// Import the asyncWrapper middleware
const { asyncWrapper } = require("../../middleware");

// Import the Application model
const { Application } = require("../../models");

/**
 * Deletes an application by its ID.
 * 
 * @function deleteApplication
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the application is deleted.
 */
const deleteApplication = asyncWrapper(async (req, res) => {

    // Extract the application_id from the request parameters
    const { application_id } = req.params;

    // Check if the application_id is provided
    if (!application_id) {
        // If not, return a 400 Bad Request response with an error message
        res.status(400).json({ message: "Please include application_id in url. e.g: api/v1/application/example_id", status: 400 });
        return;
    }

    // Delete the application with the provided ID from the database
    await Application.deleteOne({ _id: application_id });

    // Return a 200 OK response with a success message
    res.status(200).json({ message: "Successfully deleted", success: true });
});

// Export the deleteApplication function
module.exports = deleteApplication;