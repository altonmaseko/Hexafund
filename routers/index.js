const express = require("express");

/**
 * Router for handling user login-related routes.
 * @type {express.Router}
 */
const loginRouter = require("./loginRouter");

/**
 * Router for handling user registration-related routes.
 * @type {express.Router}
 */
const registerRouter = require("./registerRouter");

/**
 * Router for handling user logout-related routes.
 * @type {express.Router}
 */
const logoutRouter = require("./logoutRouter");

/**
 * Router for handling refresh token-related routes.
 * @type {express.Router}
 */
const refreshRouter = require("./refreshRouter");

/**
 * Router for handling user-related routes.
 * @type {express.Router}
 */
const userRouter = require("./userRouter");

/**
 * Router for handling funding opportunity-related routes.
 * @type {express.Router}
 */
const fundingOpportunityRouter = require("./fundingOpportunityRouter")

/**
 * Router for handling application-related routes.
 * @type {express.Router}
 */
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