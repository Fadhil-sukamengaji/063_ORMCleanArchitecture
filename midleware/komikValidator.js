const joi = require('joi');

function errorResponse(res, message, statusCode, details = null) {
    return res.status(status).json({
        success: false,
        message,
        data: null,
        error: details,
    });
}

const komikSchema = joi.object({
    title: joi.string().trim().min(1).max(200).required(),
    description: joi.string().trim().allow(null, '').optional(),
    author: joi.string().trim().min(1).max(100).required(),
});