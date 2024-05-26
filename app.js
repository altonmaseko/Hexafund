// imports
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/connectDB");
require("dotenv").config();
const { verifyAccessToken, errorHandler } = require("./middleware");
const cors = require("cors");
const { User } = require("./models");
const { roles } = require("./constants");

// test

// Routers
const { registerRouter,
    loginRouter,
    refreshRouter,
    logoutRouter,
    userRouter,
    fundingOpportunityRouter,
    applicationRouter
} = require("./routers");
// END: Routers

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// ***SIMPLIFIED ROUTES


// Mapping of simplified URLs to actual file paths
// app.use(express.static("./frontend")); handles other files.
const urlMap = {
    '/login': '/login.html',
    '/signup': '/signup.html',
    '/blocked': '/blocked.html',
    '/about': '/about.html',
    '/profile': '/profile.html',

    // APPLICANT
    '/apply': '/Applicant-Pages/AppPage_Apply.html',
    '/my-applications': '/Applicant-Pages/ViewMyApplications.html',

    // FUNDING MANAGER
    '/create': '/Funding-Manager-Pages/create-funding-opportunity.html',
    '/all-applications': '/Funding-Manager-Pages/fm-view-all-applications.html',
    '/opportunity-statuses': '/Funding-Manager-Pages/funding-opportunity-statuses.html',
    '/applicant-application': '/Funding-Manager-Pages/view-individual-applications.html',

    // ADMIN
    '/all-opportunities': '/Platform-Admin-Pages/delete-opportunities-dashboard.html',
    '/manage-managers': '/Platform-Admin-Pages/manager-approval-dashboard.html',
    '/manage-opportunities': '/Platform-Admin-Pages/opportunity-approval-dashboard.html',
    '/manage-users': '/Platform-Admin-Pages/view-all-users.html'

};


// END: SIMPLIFIED ROUTES

app.use(express.static("./frontend")); //serve the front end


// Middleware to handle simplified URLs
app.get(Object.keys(urlMap), (req, res) => {
    const actualPath = path.join(__dirname, 'frontend', urlMap[req.path]);
    res.sendFile(actualPath, (err) => {
        if (err) {
            res.status(404).send('File not found');
        }
    });
});


// Dont need an access token to do these:
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/refresh", refreshRouter); //Need a refresh token to create new access token. If no refresh token, wont continue.
app.use("/logout", logoutRouter);

app.use("/api/v1", [userRouter, fundingOpportunityRouter, applicationRouter]);


// -----------------------------------

app.use(verifyAccessToken); //if access token is invalid, code will not continue ahead of this

// PLACE HOLDER
app.get("/home", async (req, res) => {
    const email = req.cookies.email;

    console.log(`email: ${email}`);

    const user = await User.findOne({ email: email });

    if (!user) {
        alert("Please login to continue.");
        return res.status(401).json({ message: "Please login to continue" });
    }

    console.log(`applicant? ${user?.role}`);

    if (user?.role === roles.APPLICANT) {
        const Applicant = require("./models/Applicant.js");
        const applicant = await Applicant.findOne({ email: email });

        if (applicant?.account_details.account_active) {
            console.log("applicant home page");
            res.status(200).sendFile(path.join(__dirname, "frontend", "Applicant-Pages", "home-page.html"));
        }
        else {
            console.log("applicant blocked page");
            res.status(200).sendFile(path.join(__dirname, "frontend", "blocked.html"));
        }
    }
    else if (user?.role === roles.FUNDING_MANAGER) {
        const FundingManager = require("./models/FundingManager.js");
        const fundingManager = await FundingManager.findOne({ email: email });

        if (fundingManager?.account_details.account_active) {
            console.log("funding manager home page");
            res.status(200).sendFile(path.join(__dirname, "frontend", "Funding-Manager-Pages", "home-page.html"));
        }
        else {
            if (fundingManager?.account_details.reason === "Account Request Denied") {
                console.log("funding manager request-denied page");
                res.status(200).sendFile(path.join(__dirname, "frontend", "Funding-Manager-Pages", "request-denied.html"));;
            }
            else if (fundingManager?.account_details.reason === "Account Blocked by Platform Admin") {
                console.log("funding manager blocked page");
                res.status(200).sendFile(path.join(__dirname, "frontend", "blocked.html"));
            }
            else {
                console.log("funding manager awaiting approval page");
                res.status(200).sendFile(path.join(__dirname, "frontend", "Funding-Manager-Pages", "awaiting-approval.html"));
            }
        }
    }
    else if ((user?.role === roles.PLATFORM_ADMIN)) {
        console.log("admin page");
        res.status(200).sendFile(path.join(__dirname, "frontend", "Platform-Admin-Pages", "home-page.html"));
    }
});
// END: PLACE HOLDER

app.use(errorHandler);

app.all("*", (req, res) => {
    res.status(404).send("404 NOT FOUND")
});

const PORT = process.env.PORT;

connectDB();
mongoose.connection.on("connected", async () => {
    console.log("SUCCESSFULLY CONNECTED TO DATABASE");
    app.listen(PORT, () => {
        console.log(`server listening on port: ${PORT}...`)
    });

});
mongoose.connection.on("disconnected", () => {
    console.log("Lost connection to database")
});