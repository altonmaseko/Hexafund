/**
 * @module middleware/asyncWrapper
 */

/**
 * @description Wraps an asynchronous function and handles any errors that it throws.
 * @param {Function} fn - The asynchronous function to wrap.
 * @returns {Function} The wrapped function.
 */
const asyncWrapper = (fn) => {
    // Return a new asynchronous function
    return async (req, res, next) => {
        try {
            // It's expected that this function will handle a request and send a response
            await fn(req, res);
        } catch (error) {
            // Send a 500 Internal Server Error response with the error message
            res.status(500).json({ error: error.message });
            // Also log the error message to the console
            console.log(error.message);
        }
    }
}

// Export the asyncWrapper function as a module
module.exports = asyncWrapper;