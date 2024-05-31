const logger = require("../logger");

function errorHandler(err, req, res, next) {
    const status = err.status || 500;
    const message = err.message || "FALLO GENERAL";
    const method = req.method;
    const url = req.originalUrl;
    const ip = req.ip;
    const stack = err.stack || "No stack trace available";

    logger.error.error(`Status: ${status} - Message: ${message} - Method: ${method} - URL: ${url} - IP: ${ip} - Stack: ${stack}`);

    res.status(status).json({
        status,
        message,
        method,
        url,
        ip,
        stack: process.env.NODE_ENV === 'production' ? 'Stack trace not available' : stack
    });
}

module.exports = errorHandler;
