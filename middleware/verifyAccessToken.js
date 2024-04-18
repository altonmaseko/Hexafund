const path = require("path")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const verifyAccessToken = async (req, res, next) => {

    const authHeader = req.headers.Authorization || req.headers.authorization

    if (!authHeader) {
        res.status(401).json({ message: "You are unauthorized to access this resource", status: 401 })
        return
    } else {
        if (!authHeader.startsWith("Bearer")) {
            res.status(403).json({message: "You are forbidden from accessing this resource", status: 403})
            return
        }
    }

    const accessToken = authHeader.split(" ")[1]

    jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                res.status(403).json({message: "You are forbidden from accessing this resource", status: 403})
                return
            }

            req.userInfo = decoded.userInfo
            next()
        }
    )


}

module.exports = verifyAccessToken