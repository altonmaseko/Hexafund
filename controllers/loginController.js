const jwt = require("jsonwebtoken");
require("dotenv").config();

const { asyncWrapper } = require("../middleware");
const { User } = require("../models");

const loginController = asyncWrapper(async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: "Please enter email AND password", status: 400 });
        return;
    }

    let user = await User.findOne({ email: email, password: password }).exec();

    if (!user) {
        res.status(404).json({message: "Invalid email or password", status: 404}); //404: user not found
        return;
    }

    //create access and refresh tokens

    const name = user.name;

    const accessToken = jwt.sign(
        {
            userInfo: {
                name,
                email
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1800s" } //TODO: change expiration time
    );

    const refreshToken = jwt.sign(
        { name },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" } //TODO: change expiration time
    );

    await User.updateOne({ email: email }, { refreshToken: refreshToken });

    //TODO: change max age
    res.cookie("jwt", refreshToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 }); //24 hours in milliseconds
    
    res.status(200).json({ accessToken: accessToken, name:user.name });
});

module.exports = loginController;