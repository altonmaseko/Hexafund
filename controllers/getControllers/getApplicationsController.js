const { application } = require("express");
const { asyncWrapper } = require("../../middleware");
const { Application } = require("../../models");

const getApplications = async (req, res) => {
    const { application_id } = req.params;

    console.log(application_id);
    console.log("getApplications");
   
    // GET APPLICATION DATA

    let applications = await Application.find({});

    const query = req.query; // when browser url is ...?property=value&property2=value

    console.log(query);

    if (Object.values(query).length <= 0) {
        res.status(200).json(applications);
        return;
    }

    for (let key in query) {
        applications = applications.filter((application) => {
            if (key.includes(".")) {
                const keys = key.split(".");
                console.log(keys);

                if (application[keys[0]][keys[1]]?.toString() == query[key]) {
                    return application;
                }
            }
            if (application[key]?.toString() === query[key]) {
                return application;
            }
        });
    }

    res.status(200).json(applications);

     // if (application_id) {
    //     let application = await Application.findOne({_id: application_id});

    //     const document_data = application.document_data;
        
    //     if (!document_data)
    //     {
    //         console.log("SORRY NO DOCUMENT_DATA");
    //         res.send("NO DOCUMENT");
    //         return;
    //     }

    //     console.log(document_data);

    //     try {
    //       const pdfResponse = convertBase64ToPDF(document_data);
    
    //       // Set headers for download
    //       res.setHeader('Content-Type', pdfResponse.contentType);
    //       res.setHeader('Content-Disposition', pdfResponse.contentDisposition);
    
    //       // Send the PDF data
    //       res.end(pdfResponse.data);
    //     } catch (error) {
    //       console.error(error);
    //       res.status(500).send('Error converting base64 to PDF');
    //     }
    
    //     return;
    //   }

};

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


module.exports =  getApplications;