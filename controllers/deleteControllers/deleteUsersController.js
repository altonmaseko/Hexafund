/**
 * @module controllers/deleteUsersController
 * @description This module is responsible for deleting users from the database
 * @todo add function that is used when an admin deletes a user from the databse
 */

// imports
const { User, FundingManager, Applicant, Company, FundingOpportunity, Application } = require("../../models");
const { roles } = require("../../constants");
const { asyncWrapper } = require("../../middleware");

/**
 * @function: Deletes the user from the database and clears the jwt cookie
 * 
 * @todo: notify applicants of the deletion of the funding manager as all funding opportunities managed by the funding manager will be deleted
 * and all applications made to those funding opportunities will be deleted
 */
const selfDeleteUser = asyncWrapper(async (req, res) => {
    const refreshToken = req.cookies.jwt; // will always have value as this function will only be called if the user is logged in

    const user = await User.findOne({ refreshToken: refreshToken }).exec();
    const email = user.email;
    const role = user.role;

    res.clearCookie("jwt", { httpOnly: true });
    await User.deleteOne({ email: email });

    switch (role) {
        case roles.FUNDING_MANAGER:
            const fundingManager = await FundingManager.findOne({ email: email }).exec();
            const company_name = fundingManager.company;

            // delete all applications made to funding opportunities managed by the funding manager
            const funding_opps = await FundingOpportunity.find({ funding_manager_email: email }).exec();
            if (funding_opps) {
                const funding_opps_ids = funding_opps.map(funding_opp => funding_opp._id);
                await Application.deleteMany({ funding_opportunity_id: { $in: funding_opps_ids } });
            }

            // remove the funding manager from the company they work(ed) for
            await Company.updateOne({ name: company_name }, { $pull: { funding_managers: email } });
            // delete all funding opportunities managed by the funding manager
            await FundingOpportunity.deleteMany({ funding_manager_email: email }); //TODO: notify applicants

            //check if company has any funding managers left
            const company = await Company.findOne({ name: company_name }).exec();
            if (company.funding_managers.length === 0) {
                await Company.deleteOne({ name: company_name }); // delete the company
            }

            //finally, delete the funding manager
            await FundingManager.deleteOne({ email: email });

            break;
        case roles.APPLICANT:
            // delete all applications made by the applicant
            const applications = await Application.find({ applicant_email: email }).exec();
            if (applications) {
                await Application.deleteMany({ applicant_email: email });
            }

            // finally, delete the applicant
            await Applicant.deleteOne({ email: email });

            break;
        default:
            break;
    }
});

/*
const adminDeleteUser = asyncWrapper(async (req, res) => {
    //TODO: implement this function
});
*/

module.exports = {
    selfDeleteUser
};