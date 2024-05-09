const loginRouter = require("./loginRouter");
const registerRouter = require("./registerRouter");
const logoutRouter = require("./logoutRouter");
const refreshRouter = require("./refreshRouter");
const userRouter = require("./userRouter");
const fundingOpportunityRouter = require("./fundingOpportunityRouter")
const applicationRouter = require("./applicationRouter")

module.exports = {
    loginRouter,
    registerRouter,
    logoutRouter,
    refreshRouter,
    userRouter,
    fundingOpportunityRouter,
    applicationRouter
};