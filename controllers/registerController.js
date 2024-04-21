/**
 * Notes for user creation:
 * 1. User creation requires a name, email and password.
 * 2. The email must be unique.
 * 3. Being a Funding Manager or an Applicant depends on whether a company name was provided
 * 4. If a user wishes to be a funding manager, the front end will force them to provide a company name.
 */

// imports
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Applicant = require("../models/Applicant");
const FundingManager = require("../models/FundingManager");
const asyncWrapper = require("../middleware/asyncWrapper");

const registerController = asyncWrapper(async (req, res) => {
    const { name, email, password, company, role } = req.body;

    let { name, password, email, company, role } = req.body

    if (!name || !password || !email) {
        res.status(400).json({ message: "Please ensure you have entered your Name, Email and Password", status: 400 });
        return;
    }


    const duplicateUser = await User.findOne({ email }).exec()

    //Check if email is already taken
    if (duplicateUser) {
        res.status(409).json({ message: `The email: '${duplicateUser.email}' is already taken :)`, status: 409 })
        return
    }

    //Encrypt password
    const encryptedPassword = await bcrypt.hash(password, 10);

    //Role of user depends on existence of company
    if (company) {
        if (role === "fund manager"){
            role = "pending"
        }
        const user = await User.create({ //funding manager
            name,
            password: encryptedPassword,
            email,
            company,
            role
        })
        console.log(user)

    } else {
        const user = await User.create({ //the applicant
            name,
            password: encryptedPassword,
            email,
            role
        })
        console.log(user)
    }

    res.status(201).json({ message: `${email} has been successfully registered.`, status: 201 })
    
})


module.exports = registerController;