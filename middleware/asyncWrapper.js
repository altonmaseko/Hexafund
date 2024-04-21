const asyncWrapper = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res);
        } catch (error) {
            res.status(500).json({ error: error.message });
            console.log(error.message);
        }
    }
}

module.exports = asyncWrapper;