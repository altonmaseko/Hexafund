/**
 * @module middleware
 */

/**
 * Import the asyncWrapper function from the asyncWrapper module.
 * @type {Function}
 */
const asyncWrapper = require("./asyncWrapper");

/**
 * Import the errorHandler function from the errorHandler module.
 * @type {Function}
 */
const errorHandler = require("./errorHandler");

/**
 * Import the verifyAccessToken function from the verifyAccessToken module.
 * @type {Function}
 */
const verifyAccessToken = require("./verifyAccessToken");

/**
 * Export the imported functions as a module.
 * @type {Object}
 */
module.exports = {
    asyncWrapper, // The asyncWrapper function
    errorHandler, // The errorHandler function
    verifyAccessToken // The verifyAccessToken function
};