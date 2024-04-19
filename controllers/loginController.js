const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const asyncWrapper = require("../middleware/asyncWrapper")

const User = require("../models/User")

const loginController = asyncWrapper(async (req, res) => {

    const { name, password } = req.body

    if (!name || !password) {
        res.status(400).json({ message: "Please enter username AND password AND email", status: 400 })
        return
    }

    let user = await User.findOne({ name }).exec()

    if (!user) {
        res.status(404).json({message: "Invalid username or password", status: 404}) //404 not found
        return
    }

    const correctPassword = await bcrypt.compare(password, user.password)

    if (!correctPassword) {
        res.status(401).json({message: "Invalid username or password", status: 401}) //401 unauthorized
        return
    }

    //create access and refresh tokens

    const email = user.email

    const accessToken = jwt.sign(
        {
            userInfo: {
                name,
                email
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "60s" }
    )

    const refreshToken = jwt.sign(
        { name },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
    )

    user.refreshToken = refreshToken
    await user.save()

    res.cookie("jwt", refreshToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 }) //24 hours in milliseconds
    
    res.status(200).json({ accessToken })
})

module.exports = loginController