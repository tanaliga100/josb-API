"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMidlleware = void 0;
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const errorHandlerMidlleware = (err, req, res, next) => {
    console.log(err instanceof errors_1.CustomError ? "custom error" : "fallback error");
    if (err instanceof errors_1.CustomError) {
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
            error: {
                message: err.message,
                statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
            },
        });
    }
    res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
};
exports.errorHandlerMidlleware = errorHandlerMidlleware;
