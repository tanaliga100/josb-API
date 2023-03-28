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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const http_status_codes_1 = require("http-status-codes");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const BadRequestError_1 = __importDefault(require("../errors/BadRequestError"));
const asyncMiddleware_1 = require("../middlewares/asyncMiddleware");
const user_model_1 = __importDefault(require("../models/user-model"));
const REGISTER = (0, asyncMiddleware_1.asyncMiddleware)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        throw new BadRequestError_1.default("All fields must be provided");
    }
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
    const tempUser = { name, email, password: hashedPassword };
    const user = yield user_model_1.default.create(Object.assign({}, tempUser));
    // ISSUED TOKEN HERE...
    const token = jsonwebtoken_1.default.sign({ userId: user._id, name: user.name, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
    res.status(http_status_codes_1.StatusCodes.CREATED).json({
        msg: "USER_REGISTERED",
        user: { name: user.name, email: user.email },
        token,
    });
}));
exports.REGISTER = REGISTER;
const LOGIN = (0, asyncMiddleware_1.asyncMiddleware)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Login User");
}));
exports.LOGIN = LOGIN;
