// imports
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { asyncWrapper } = require("../middleware");

const refreshController = asyncWrapper(async (req, res) => {

    const cookies = req.cookies;

    if (!cookies) { //The refresh token is not there, they cant continue. They must login to create new refresh token, which will be stored in cookies.
        res.status(401).json({message: "You are unauthorized from accessing this resource", status: 401});
        return;
    } else {
        if (!cookies.jwt) { //Same thing (see above comment), refresh token not there
            res.status(401).json({message: "You are unauthorized from accessing this resource", status: 401});
            return;
        }
    }

    //refresh token found
    const refreshToken = cookies.jwt;

    const user = await User.find({ refreshToken: refreshToken });

    if (!user) { // no user with the refresh token stored in the cookie
        res.status(403).json({message: "You are forbidden from accessing this resource.", status: 403});
        return;
    }

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || decoded.name !== user.name) { //Name stored in refresh token is not same as name stored in users table, but same refresh token? Some fishy stuff.
                res.status(403).json({message: "You are forbidden from accessing this resource.", status: 403});
                return;
            }

            const accessToken = jwt.sign(
                {
                    userInfo: {
                        name: decoded.name,
                        email: user.email
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "60s" }
            );

            req.userInfo = {
                name: decoded.name,
                email: user.email
            };
            
            res.json({ accessToken });
        }
    );
});

module.exports = refreshController;