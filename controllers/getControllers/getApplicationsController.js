/**
 * @module getControllers/getApplicationsController
 */

//imports

// Import the asyncWrapper middleware from the middleware directory
const { asyncWrapper } = require("../../middleware");

// Import the Application model from the models directory
const { Application } = require("../../models");

/**
 * Retrieves applications based on the provided query parameters.
 * If no query parameters are provided, returns all applications.
 * If query parameters are provided, filters applications based on the parameters.
 * @function getApplications
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the applications are retrieved and sent as a response.
 */
const getApplications = asyncWrapper(async (req, res) => {
    // Extract the application_id from the request parameters
    const { application_id } = req.params;

    // Log the application_id for debugging purposes
    console.log(application_id);
    console.log("getApplications");

    // GET APPLICATION DATA

    // Fetch all applications from the database
    let applications = await Application.find({});

    // Extract the query parameters from the request
    const query = req.query; // when browser url is ...?property=value&property2=value

    // Log the query parameters for debugging purposes
    console.log(query);

    // If there are no query parameters, return all applications
    if (Object.values(query).length <= 0) {
        res.status(200).json(applications);
        return;
    }

    // For each query parameter
    for (let key in query) {
        // Filter the applications based on the query parameter
        applications = applications.filter((application) => {
            // If the key includes a ".", it means we're accessing a nested property
            if (key.includes(".")) {
                // Split the key into its components
                const keys = key.split(".");
                console.log(keys);

                // If the application's property matches the query parameter, return the application
                if (application[keys[0]][keys[1]]?.toString() == query[key]) {
                    return application;
                }
            }
            // If the application's property matches the query parameter, return the application
            if (application[key]?.toString() === query[key]) {
                return application;
            }
        });
    }

    // Send a 200 OK response with the filtered applications
    res.status(200).json(applications);

    /*
    if (application_id) {
        let application = await Application.findOne({_id: application_id});

        const document_data = application.document_data;
        
        if (!document_data)
        {
            console.log("SORRY NO DOCUMENT_DATA");
            res.send("NO DOCUMENT");
            return;
        }

        console.log(document_data);

        try {
            const pdfResponse = convertBase64ToPDF(document_data);
    
            // Set headers for download
            res.setHeader('Content-Type', pdfResponse.contentType);
            res.setHeader('Content-Disposition', pdfResponse.contentDisposition);
        
            // Send the PDF data
            res.end(pdfResponse.data);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error converting base64 to PDF');
        }
    
        return;
    }
    */
});

/*
const convertBase64ToPDF = (base64String) => {
    // Check if the base64 string is valid (optional)
    const isBase64 = /^[A-Za-z0-9+\/]+=*$/i.test(base64String);
    if (!isBase64) {
        throw new Error('Invalid base64 string');
    }

    // Decode the base64 string into a Buffer
    const decodedData = Buffer.from(base64String, 'base64');

    // Optionally save the PDF to a file (comment out if not needed)
    // fs.writeFileSync('output.pdf', decodedData); // Remove comment for saving

    // Prepare the response for sending the PDF as a download to the frontend
    const response = {
        contentType: 'application/pdf',
        contentDisposition: 'attachment; filename="output.pdf"', // Adjust filename as needed
        data: decodedData, // Encode data back to base64 for transfer
    };

    return response;
}
*/

// Export the getApplications controller as a module
module.exports =  getApplications;