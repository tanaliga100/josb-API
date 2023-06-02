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
const user_model_1 = __importDefault(require("../models/user-model"));
const async_middleware_1 = require("./async-middleware");
const authenticationMiddleware = (0, async_middleware_1.asyncMiddleware)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // CHECK AUTH-HEADER
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        throw new errors_1.UnAuthenticatedError("UNAUTHENTICATED: No Token Provided");
    }
    // DECODE THE TOKEN... USING JWT.VERIFY METHOD
    try {
        const authToken = authHeader.split(" ")[1];
        const jwtSecret = process.env.JWT_SECRET;
        const decoded = jsonwebtoken_1.default.verify(authToken, jwtSecret);
        const { name, _id: userId, email } = decoded;
        // LOOK FOR THE VALUE IN THE DATABASE IF ITS EXISTED;
        const user = yield user_model_1.default.find({ _id: userId }).select("-password");
        // PASSED THE DECODED VALUES AS USER OBJECT AND RECEIVES IT IN THE LOGIN CONTROLLER
        req.user = user;
        next();
    }
    catch (error) {
        console.log(error);
        throw new errors_1.UnAuthenticatedError("UNAUTHORIZED: Not authorized to access this route");
    }
}));
exports.default = authenticationMiddleware;
