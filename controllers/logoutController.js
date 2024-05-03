// imports
const { User } = require("../models");
const { asyncWrapper } = require("../middleware");

const logoutController = asyncWrapper(async (req, res) => {

    const cookies = req.cookies;

    if (!cookies) {
        res.status(204).json({message: "Already logged out", status: 204});
        return;
    } else {
        if (!cookies.jwt) {
            res.status(204).json({message: "Already logged out", status: 204});
            return;
        }
    }

    const refreshToken = cookies.jwt;

    const user = await User.findOne({ refreshToken: refreshToken }).exec();

    if (!user.refreshToken) {
        res.clearCookie("jwt", { httpOnly: true });
        res.status(204).json({message: "Logged out successfully", status: 204});
        return;
    }

    // refresh token is present. clear it and return status 200
    user.refreshToken = "";
    await user.save();

    res.clearCookie("jwt", { httpOnly: true });
    res.status(200).json({message: "Logged out successfully", status: 200});
});

module.exports = logoutController;