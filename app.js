const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const connectDB = require("./config/connectDB")
require("dotenv").config()
const verifyAccessToken = require("./middleware/verifyAccessToken")
const cors = require("cors")


// Routers

const registerRouter = require("./routers/registerRouter")
const loginRouter = require("./routers/loginRouter")
const refreshRouter = require("./routers/refreshRouter")
const logoutRouter = require("./routers/logoutRouter")

// END: Routers

const app = express()


app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use(express.static("./frontend")) //serve the front end

// Dont need an access token to do these:
app.use("/register", registerRouter)
app.use("/login", loginRouter)
app.use("/refresh", refreshRouter) //Need a refresh token to create new access token. If no refresh token, wont continue.
app.use("/logout", logoutRouter)

app.use(verifyAccessToken) //if access token is invalid, code will not continue ahead of this

app.use(require("./middleware/errorHandler.js"))

app.all("*", (req, res) => {
    res.status(404).send("404 NOT FOUND")
})


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`server listening on port: ${PORT}...`)
})


connectDB()
mongoose.connection.once("connected", async () => {
    console.log("SUCCESSFULLY CONNECTED TO DATABASE")
})
mongoose.connection.on("disconnected", () => {
    console.log("Lost connection to database")
})




