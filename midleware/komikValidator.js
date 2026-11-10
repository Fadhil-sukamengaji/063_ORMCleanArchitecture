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

const idSchema = joi.object({
    id: joi.number().integer().positive().required(),
});

function validateBody(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, {
            abortEarly: false,
            convert: true,
            allowUnknown: false
        });

        if (error) {
            return errorResponse(
                res,
                'Validasi Input Gagal',
                400,
                error.details.map((item) => ({
                    field: item.path.join('.'),
                    message: item.message,
                }))
            );
        }
        req.body = value;
        next();
    };
}

function validateParams(schema) {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.params);

        if (error) {
            return errorResponse(
                res,
                'Parameter tidak valid',
                400,
                error.details.map((item) => ({
                    field: item.path.join('.'),
                    message: item.message,
                }))
            );
        }
        req.params = value;
        next();
    };
}