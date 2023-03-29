"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errors_1 = require("../errors");
const BadRequestError_1 = __importDefault(require("../errors/BadRequestError"));
const user_model_1 = __importDefault(require("../models/user-model"));
const authenticationMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //CHECK HEADER
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return next(new BadRequestError_1.default("NO TOKEN PROVIDED"));
    }
    const token = authHeader.split(" ")[1];
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = yield user_model_1.default.findById(payload.userId).select("-password");
        req.user = user;
        next();
        // next();
        // ATTACH THE USER TO THE JOB ROUTES
    }
    catch (error) {
        return next(new errors_1.UnAuthenticatedError("NOT AUTHORIZED TO ACCESS THIS ROUTE"));
    }
});
exports.default = authenticationMiddleware;
