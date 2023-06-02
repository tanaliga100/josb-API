"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnAuthenticatedError = exports.NotFoundError = exports.CustomError = exports.BadRequestError = void 0;
const badRequest_error_1 = __importDefault(require("./badRequest.error"));
exports.BadRequestError = badRequest_error_1.default;
const custom_error_1 = __importDefault(require("./custom.error"));
exports.CustomError = custom_error_1.default;
const notFound_error_1 = __importDefault(require("./notFound.error"));
exports.NotFoundError = notFound_error_1.default;
const unauthenticated_error_1 = __importDefault(require("./unauthenticated.error"));
exports.UnAuthenticatedError = unauthenticated_error_1.default;
