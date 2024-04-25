// imports
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/connectDB");
if (process.env.CI != true){
    require("dotenv").config();
}
const verifyAccessToken = require("./middleware/verifyAccessToken");
const cors = require("cors");
const User = require("./models/User");
const { SHA256 } = require("crypto-js");

const { 
    PLATFORM_ADMIN, 
    FUNDING_MANAGER, 
    APPLICANT 
} = require("./constants/roles")

// Routers
const registerRouter = require("./routers/registerRouter");
const loginRouter = require("./routers/loginRouter");
const refreshRouter = require("./routers/refreshRouter");
const logoutRouter = require("./routers/logoutRouter");
const userRouter = require("./routers/userRouter.js")
// END: Routers

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use(express.static("./frontend")); //serve the front end

// Dont need an access token to do these:
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/refresh", refreshRouter); //Need a refresh token to create new access token. If no refresh token, wont continue.
app.use("/logout", logoutRouter);

app.use("/api/v1", userRouter); //handle getting users request

// -----------------------------------

app.use(verifyAccessToken); //if access token is invalid, code will not continue ahead of this

// Initialize the database with an admin user
async function initializeDatabase() {

    await User.deleteMany({});
    // Create an admin user
    await User.create({
        name: "admin",
        email: "admin@gmail.com",
        password: SHA256("admin123").toString(),
        role: PLATFORM_ADMIN,
    });

    console.log("CREATED")

    await User.create({
        name: "testapplicant",
        email: "testapplicant@gmail.com",
        password: SHA256("applicant123").toString(),
        role: APPLICANT,
    });


    await User.create({
        name: "testfund",
        email: "testfund@gmail.com",
        password: SHA256("fund123").toString(),
        role: FUNDING_MANAGER,
    });

    console.log("Database initialized");
}

// PLACE HOLDER
app.get("/home", async (req, res) => {
    const email = req.cookies.email;

    console.log(`email: ${email}`);

    const user = await User.findOne({ email: email });

    if(!user) {
        alert("Please login to continue.");
        return res.status(401).json({ message: "Please login to continue" });
    }

    console.log(`applicant? ${user?.role}`);

    if (user?.role === APPLICANT) 
    {
        console.log("applicant home page");
        res.status(200).sendFile(path.join(__dirname, "frontend", "Applicant-Pages", "home-page.html"));
    } 
    else if (user?.role === FUNDING_MANAGER) 
    {
        const FundingManager = require("./models/FundingManager.js");
        const fundingManager = await FundingManager.findOne({ email: email });

        if (fundingManager?.account_details.account_active) 
        {
            console.log("funding manager home page");
            res.status(200).sendFile(path.join(__dirname, "frontend", "Funding-Manager-Pages", "home-page.html"));
        } 
        else 
        {
            if(fundingManager?.account_details.reason === "Account Request Denied")
            {
                console.log("funding manager request-denied page");
                res.status(200).sendFile(path.join(__dirname, "frontend", "Funding-Manager-Pages", "request-denied.html"));;
            }
            else
            {
                console.log("funding manager awaiting approval page");
                res.status(200).sendFile(path.join(__dirname, "frontend", "Funding-Manager-Pages", "awaiting-approval.html"));
            }
        }
    } 
    else if ((user?.role === PLATFORM_ADMIN) )
    {
        console.log("admin page");
        res.status(200).sendFile(path.join(__dirname, "frontend", "Platform-Admin-Pages", "approval-dashboard.html"));
    } 
});
// END: PLACE HOLDER

app.use(require("./middleware/errorHandler"));

app.all("*", (req, res) => {
    res.status(404).send("404 NOT FOUND")
});

const PORT = process.env.PORT;

connectDB();
mongoose.connection.on("connected", async () => {
    await initializeDatabase()
    console.log("SUCCESSFULLY CONNECTED TO DATABASE");
    app.listen(PORT, () => {
        console.log(`server listening on port: ${PORT}...`)
    });
});
mongoose.connection.on("disconnected", () => {
    console.log("Lost connection to database")
});