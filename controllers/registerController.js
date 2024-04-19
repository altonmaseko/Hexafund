const bcrypt = require("bcrypt")

const User = require("../models/User")

const asyncWrapper = require("../middleware/asyncWrapper")

const registerController = asyncWrapper(async (req, res) => {

    const { name, password, email, company, role } = req.body

    if (!name || !password || !email) {
        res.status(400).json({ message: "Please enter username AND password AND email", status: 400 })
        return
    }

    const duplicateUser = await User.findOne({ name }).exec()

    if (duplicateUser) {
        res.status(409).json({ message: `The name: '${duplicateUser.name}' is already taken :) `, status: 409 })
        return
    }

    const encryptedPassword = await bcrypt.hash(password, 10)


    if (company) {
        await User.create({ //funding manager
            name,
            password: encryptedPassword,
            email,
            company,
            role
        })
    } else {
        await User.create({ //the applicant
            name,
            password: encryptedPassword,
            email
        })
    }


    res.status(201).json({ message: `${name} has been successfully registered.`, status: 201 })
    
})

module.exports = registerController