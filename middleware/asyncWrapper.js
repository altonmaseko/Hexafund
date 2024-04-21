const asyncWrapper = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res);
        } catch (error) {
            res.status(500).send(error.message);
            console.log(error.message);
            next();
            return;
        }
    }
}

module.exports = asyncWrapper;