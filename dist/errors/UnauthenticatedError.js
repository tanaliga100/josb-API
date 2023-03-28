"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const CustomError_1 = __importDefault(require("./CustomError"));
class UnAuthenticatedError extends CustomError_1.default {
    constructor(message) {
        super(message);
        this.statusCode = http_status_codes_1.StatusCodes.UNAUTHORIZED;
    }
}
exports.default = UnAuthenticatedError;
