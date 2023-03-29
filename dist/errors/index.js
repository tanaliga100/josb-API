"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnAuthenticatedError = exports.CustomError = exports.BadRequestError = void 0;
const BadrequestError_1 = __importDefault(require("./BadrequestError"));
exports.BadRequestError = BadrequestError_1.default;
const CustomError_1 = __importDefault(require("./CustomError"));
exports.CustomError = CustomError_1.default;
const UnauthenticatedError_1 = __importDefault(require("./UnauthenticatedError"));
exports.UnAuthenticatedError = UnauthenticatedError_1.default;
