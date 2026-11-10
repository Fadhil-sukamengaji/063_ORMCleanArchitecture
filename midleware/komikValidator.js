const joi = require('joi');

function errorResponse(res, message, statusCode, details = null) {
    return res.status(status).json({
        success: false,
        message,
        data: null,
        error: details,
    });
}