const errorHandler = (err, req, res, next) => {
    console.log(`an error has occured: ${err.message}`);
    res.status(500).json({ name: err.name, message: err.message });
    return;
}

module.exports = errorHandler;