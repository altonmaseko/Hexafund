/**
 * @module middleware/errorHandler
 */

/**
 * @description Error handling middleware function for Express.js. Logs the error message and sends a JSON response with the error name and message.
 * @param {Error} err - The error that occurred.
 * @param {Object} req - The Express.js request object.
 * @param {Object} res - The Express.js response object.
 * @param {Function} next - The next middleware function in the stack.
 * @returns {void}
 */
const errorHandler = (err, req, res, next) => {
    // Log the error message to the console
    console.log(`an error has occurred: ${err.message}`);
    
    // Send a 500 Internal Server Error response with the error name and message
    res.status(500).json({ name: err.name, message: err.message });
    
    // End the middleware function
    return;
}

// Export the errorHandler function as a module
module.exports = errorHandler;