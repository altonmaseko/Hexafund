/**
 * @module updateControllers/updateApplicationController
 */

// Import the asyncWrapper middleware and the Application model
const { asyncWrapper } = require("../../middleware");
const { Application } = require("../../models");

/**
 * Updates an application by its ID.
 * 
 * @function updateApplication
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the application is updated.
 */
const updateApplication = asyncWrapper(async (req, res) => {

    // Extract the application_id from the request parameters
    const { application_id } = req.params;

    // Extract the request body
    const body = req.body;

    // If the application_id is not provided in the URL, return a 400 Bad Request response
    if (!application_id) {
        res.status(400).json({ message: "Please include application_id in url. e.g: api/v1/application/example_id", status: 400 });
        return;
    }

    // If the request body is empty, return a 400 Bad Request response
    if (Object.keys(body).length <= 0) {
        res.status(400).json({ message: "Please include a body of the properties you want to modify", status: 400 });
        return;
    }

    // Update the application with the provided ID using the properties in the request body
    await Application.updateOne({ _id: application_id }, { $set: body });

    // Send a 200 OK response with a success message and the updated data
    res.status(200).json({ message: "Successfully updated", success: true, data: body });
});

// Export the updateApplication function
module.exports = updateApplication;