
const { Application } = require("../../models");
const { asyncWrapper } = require("../../middleware");

const createApplication = asyncWrapper(async (req, res) => {
    console.log("CREATE APPLICATION");

    const { applicant_email,
        funding_opportunity_id,
        reason,
        contact_number,
        cv_data,
        application_form_data
    } = req.body;

    if (!applicant_email || !reason || !contact_number) {
        res.status(400).json({ message: "Please ensure you have entered the Applicant Email, Funding Opportunity ID, Reason, and Contact Number.", status: 400 });
        return;
    }

    const duplicateApplication = await Application.findOne({ applicant_email: applicant_email, funding_opportunity_id: funding_opportunity_id }).exec();

    //Check if funding opportunity already exists
    if (duplicateApplication) {
        res.status(409).json({ message: `This application by: '${duplicateApplication.applicant_email}' already exists`, status: 409 })
        return
    }

    await Application.create({
        applicant_email,
        funding_opportunity_id,
        reason,
        contact_number,
        cv_data,
        application_form_data
    });

    res.status(201).json({ message: `Application successfully submitted.`, status: 201 });
});

module.exports = createApplication;