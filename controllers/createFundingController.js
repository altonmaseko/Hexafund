
const { FundingOpportunity } = require("../models");
const { asyncWrapper } = require("../middleware");

const createFundingOpportunity = asyncWrapper(async (req, res) => {
    console.log("create funding opportunity")
    let { title,
        company_name,
        funding_manager_email,
        type, admin_status,
        funding_opportunity_id,
        funding_amount,
        available_slots,
        deadline,
    description, image_data } = req.body;

    if (!title || !company_name || !funding_manager_email || !type) {
        res.status(400).json({ message: "Please ensure you have entered the Title, Company Name, Funding Manager Email and Type", status: 400 });
        return;
    }

    const duplicateFundingOpportunity = await FundingOpportunity.findOne({ title }).exec();

    //Check if funding opportunity already exists
    if (duplicateFundingOpportunity) {
        res.status(409).json({ message: `The Funding Opportunity: '${duplicateFundingOpportunity.title}' already exists`, status: 409 })
        return
    }

    await FundingOpportunity.create({
        title,
        company_name,
        funding_manager_email,
        type,
        admin_status,
        funding_opportunity_id,
        funding_amount,
        available_slots,
        deadline,
        description,
        image_data
    })

    res.status(201).json({ message: `${title} has been successfully created.`, status: 201 });
});

module.exports = { createFundingOpportunity };