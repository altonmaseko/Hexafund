
const User = require("../models/User")
const logoutController = async (req, res) => {

    const cookies = req.cookies

    if (!cookies) {
        res.status(204).json({message: "Already logged out", status: 204})
        return
    } else {
        if (!cookies.jwt) {
            res.status(204).json({message: "Already logged out", status: 204})
            return
        }
    }

    const refreshToken = cookies.jwt

    if (!refreshToken) {
        res.status(204).json({message: "User never logged in", status: 204})
        return
    }

    const user = await User.findOne({ refreshToken }).exec()

    if (!user.refreshToken) {
        res.clearCookie("jwt", { httpOnly: true })
        res.status(204).json({message: "Logged out successfully", status: 204})
        return
    }

    user.refreshToken = ""
    await user.save()

    res.clearCookie("jwt", { httpOnly: true })
    res.status(200).json({message: "Logged out successfully", status: 200})

}

module.exports = logoutController