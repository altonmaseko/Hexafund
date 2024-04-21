const bcrypt = require("bcrypt")

const User = require("../models/User")

const asyncWrapper = require("../middleware/asyncWrapper")

const registerController = asyncWrapper(async (req, res) => {

    let { name, password, email, company, role } = req.body

    if (!name || !password || !email) {
        res.status(400).json({ message: "Please enter username AND password AND email", status: 400 })
        return
    }

    const duplicateUser = await User.findOne({ email }).exec()

    if (duplicateUser) {
        res.status(409).json({ message: `The email: '${duplicateUser.email}' is already taken :) `, status: 409 })
        return
    }

    const encryptedPassword = await bcrypt.hash(password, 10)


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

module.exports = registerController