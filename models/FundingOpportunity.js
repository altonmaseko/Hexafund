const mongoose = require("mongoose");
const { statuses, fund_types } = require("../constants");

/**
 * Represents a funding opportunity schema.
 *
 * @class FundingOpportunitySchema
 * @property {string} title - The title of the funding opportunity.
 * @property {string} company_name - The name of the company offering the funding opportunity.
 * @property {string} funding_manager_email - The email address of the funding manager.
 * @property {string} admin_status - The administrative status of the funding opportunity. Possible values: PENDING, ACCEPTED, REJECTED, APPROVED.
 * @property {string} type - The type of the funding opportunity. Possible values: EDUCATIONAL, BUSINESS, EVENT.
 * @property {number} funding_amount - The amount of funding available.
 * @property {number} available_slots - The number of available slots for the funding opportunity.
 * @property {Date} deadline - The deadline for applying to the funding opportunity.
 * @property {string} [description] - The description of the funding opportunity. Default value: "Apply for this funding Opportunity now! And start your journey of SUCCESS! You. Can. Do It."
 * @property {string} [image_data] - The image data associated with the funding opportunity.
 */
const FundingOpportunitySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    company_name: {
        type: String,
        required: true
    },
    funding_manager_email: {
        type: String,
        required: true
    },
    admin_status: {
        type: String,
        enum: [statuses.PENDING, statuses.ACCEPTED, statuses.REJECTED, statuses.APPROVED],
        default: statuses.PENDING
    },
    type: {
        type: String,
        enum: [fund_types.EDUCATIONAL, fund_types.BUSINESS, fund_types.EVENT], //Values: Educational, Business or Event
        required: true
    },
    funding_amount: {
        type: Number,
        required: true
    },
    available_slots: { //the amount of people who will recieve it. IF budget = R10000, and funding_amount = R1000, then count = 10
        type: Number,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        default: "Apply for this funding Opportunity now! And start your journey of SUCCESS! You. Can. Do It."
    },
    image_data: {
        type: String, 
    }
    
    //funding_amount history will be added later
});

module.exports = mongoose.model("Funding_Opportunity", FundingOpportunitySchema);