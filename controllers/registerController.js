/**
 * Notes for user creation:
 * 1. User creation requires a name, email and password.
 * 2. The email must be unique.
 * 3. Being a Funding Manager or an Applicant depends on whether a company name was provided
 * 4. If a user wishes to be a funding manager, the front end will force them to provide a company name.
 */

// imports
const { User, Applicant, FundingManager, Company } = require("../models");
const { asyncWrapper } = require("../middleware");

const registerController = asyncWrapper(async (req, res) => {
    const { name, email, password, company, role } = req.body;

    if (!name || !password || !email) {
        res.status(400).json({ message: "Please ensure you have entered your Name, Email and Password", status: 400 });
        return;
    }

    const duplicateUser = await User.findOne({ email: email }).exec();

    //Check if email is already taken
    if (duplicateUser) {
        res.status(409).json({ message: `The email: '${duplicateUser.email}' is already taken :)`, status: 409 })
        return
    }

    //Role of user depends on existence of company
    if (company) {
        await User.create({
            name: name,
            email: email,
            password: password,
            role: role
        });
        await FundingManager.create({
            name: name,
            email: email,
            company: company
        });

        const newCompany = await Company.findOne({ name: company }).exec(); // all companies will have different names
        if (!newCompany) { // if company does not exist, create it
            await Company.create({
                name: company
            });
        }
        
        await Company.updateOne({ name: company }, { $push: { funding_managers: email } });
    } else {
        await User.create({
            name: name,
            email: email,
            password: password
        });
        await Applicant.create({
            name: name,
            email: email
        });
    }

    res.status(201).json({ message: `${email} has been successfully registered.`, status: 201 });
});

module.exports = registerController;