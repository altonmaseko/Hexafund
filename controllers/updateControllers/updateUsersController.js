const { asyncWrapper } = require("../../middleware");
const { User, Applicant, FundingManager } = require("../../models");

const updateApplicants = asyncWrapper(async (req, res) => {

    const { email } = req.params;
    let body = req.body;

    if (!email) {
        res.status(400).json({ message: "Please include email in url. e.g: api/v1/applicant/example@gmail.com", status: 400 });
        return;
    }

    if (Object.keys(body).length <= 0) {
        res.status(400).json({ message: "Please include a body of the properties you want to modify", status: 400 });
        return;
    }

    const applicant = await Applicant.findOne({ email: email });

    //prevent overiding of account_details object
    let newAccountDetails;
    if (body.account_details) {
        newAccountDetails = { ...applicant.account_details, ...body.account_details };
    }
    if (newAccountDetails) {
        body.account_details = newAccountDetails;
    }

    await Applicant.updateOne({ email: email }, { $set: body });
    await User.updateOne({ email: email }, { $set: body });

    res.status(200).json({ message: "successfully updated", success: true, data: body });
});

const updateFundingManagers = asyncWrapper(async (req, res) => {

    const { email } = req.params;
    let body = req.body;

    if (!email) {
        res.status(400).json({ message: "Please include email in url. e.g: api/v1/funding-manager/example@gmail.com", status: 400 });
        return;
    }

    if (Object.keys(body).length <= 0) {
        res.status(400).json({ message: "Please include a body of the properties you want to modify", status: 400 });
        return;
    }

    const fundingManger = await FundingManager.findOne({ email: email });

    //prevent overiding of account_details object
    let newAccountDetails;
    if (body.account_details) {
        newAccountDetails = { ...fundingManger.account_details, ...body.account_details };
    }
    if (newAccountDetails) {
        body.account_details = newAccountDetails;
    }

    await FundingManager.updateOne({ email: email }, { $set: body });
    await User.updateOne({ email: email }, { $set: body }); // if the property doesnt axist in User, it wont add it

    res.status(200).json({ message: "successfully updated", success: true, data: body });
});

module.exports = { 
    updateApplicants, 
    updateFundingManagers 
};