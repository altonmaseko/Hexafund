/**
 * @module createControllers/createApplicationController
 */

// Import the Application and Applicant models from the models directory
const { Application, Applicant } = require("../../models");

// Import the asyncWrapper middleware from the middleware directory
const { asyncWrapper } = require("../../middleware");

/**
 * Create a new application.
 * 
 * @function createApplication
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the application is created.
 */
const createApplication = asyncWrapper(async (req, res) => {
    console.log("CREATE APPLICATION");

    // Extract the necessary data from the request body
    const { applicant_email,
        funding_opportunity_id,
        reason,
        contact_number,
        cv_data,
        application_form_data,
        other_data
    } = req.body;

    // Validate that the required fields are provided
    if (!applicant_email || !reason || !contact_number) {
        // If not, send a 400 Bad Request response with a message
        res.status(400).json({ message: "Please ensure you have entered the Applicant Email, Funding Opportunity ID, Reason, and Contact Number.", status: 400 });
        return;
    }

    // Check if a duplicate application already exists
    const duplicateApplication = await Application.findOne({ applicant_email: applicant_email, funding_opportunity_id: funding_opportunity_id }).exec();
    if (duplicateApplication) {
        // If so, send a 409 Conflict response with a message
        res.status(409).json({ message: `This application by: '${duplicateApplication.applicant_email}' already exists`, status: 409 })
        return;
    }

    // Create a new application
    await Application.create({
        applicant_email,
        funding_opportunity_id,
        reason,
        contact_number,
        cv_data,
        application_form_data,
        other_data
    });

    // Retrieve the newly created application
    const application = await Application.findOne({ applicant_email: applicant_email, funding_opportunity_id: funding_opportunity_id }).exec();

    // Add the application ID to the applicant's applications array
    await Applicant.updateOne({ email: applicant_email }, {$push: {
        Applications: application._id
    }});

    // Send a 201 Created response with a success message
    res.status(201).json({ message: `Application successfully submitted.`, status: 201 });
});

// Export the createApplication controller as a module
module.exports = createApplication;