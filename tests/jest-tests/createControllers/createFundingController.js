
const { FundingOpportunity } = require("../../models");
const { asyncWrapper } = require("../../middleware");

const createFundingController = asyncWrapper(async (req, res) => {
    console.log("create funding opportunity");

    const { title,
        company_name,
        funding_manager_email,
        type, admin_status,
        funding_amount,
        available_slots,
        deadline,
    description, image_data } = req.body;

    if (!title || !company_name || !funding_manager_email || !type) {
        res.status(400).json({ message: "Please ensure you have entered the Title, Company Name, Funding Manager Email and Type", status: 400 });
        return;
    }

    const duplicateFundingOpportunity = await FundingOpportunity.findOne({ title: title }).exec();

    //Check if funding opportunity already exists
    if (duplicateFundingOpportunity) {
        res.status(409).json({ message: `The Funding Opportunity: '${duplicateFundingOpportunity.title}' already exists`, status: 409 })
        return
    }

    await FundingOpportunity.create({
        title: title,
        company_name: company_name,
        funding_manager_email: funding_manager_email,
        type: type,
        admin_status: admin_status,
        funding_amount: funding_amount,
        available_slots: available_slots,
        deadline: deadline,
        description: description,
        image_data: image_data
    });

    res.status(201).json({ message: `${title} has been successfully created.`, status: 201 });
});

module.exports = createFundingController;