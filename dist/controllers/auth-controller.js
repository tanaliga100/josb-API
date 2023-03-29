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
exports.REGISTER = exports.LOGIN = void 0;
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const BadRequestError_1 = __importDefault(require("../errors/BadRequestError"));
const async_middleware_1 = require("../middlewares/async-middleware");
const user_model_1 = __importDefault(require("../models/user-model"));
const REGISTER = (0, async_middleware_1.asyncMiddleware)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    // PASSWORD HASHED IN MODEL SCHEMA
    const user = yield user_model_1.default.create(Object.assign({}, req.body));
    // TOKEN GENERATED IN MODEL SCHEMA
    const token = user.createJWT();
    res.status(http_status_codes_1.StatusCodes.CREATED).json({
        msg: "USER_REGISTERED",
        user: { name: user.name, email: user.email },
        token,
    });
}));
exports.REGISTER = REGISTER;
const LOGIN = (0, async_middleware_1.asyncMiddleware)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // CHECK REQUEST BODY
    if (!email || !password) {
        throw new BadRequestError_1.default("");
    }
    // FIND EXISTING EMAIL
    const user = yield user_model_1.default.findOne({ email });
    // IF NOT FOUND THROW ERROR
    if (!user) {
        throw new errors_1.UnAuthenticatedError(`No user associated with the email: ${email}`);
    }
    const isPasswordCorrect = yield user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new errors_1.UnAuthenticatedError(`Password dont match`);
    }
    // RELEASED TOKEN HERE
    const token = user.createJWT();
    // SEND BACK RESPONSE TO THE CLIENT
    res.status(http_status_codes_1.StatusCodes.OK).json({
        msg: "USER_LOGIN",
        user: { name: user.name, email: user.email },
        token,
    });
}));
exports.LOGIN = LOGIN;
