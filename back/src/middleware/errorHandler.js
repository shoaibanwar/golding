// Middleware function for handling all errors
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        error: err.message || "Internal Server Error"
    });
};

export default errorHandler;  