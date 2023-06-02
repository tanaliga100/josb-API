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
const async_middleware_1 = require("../middlewares/async-middleware");
const user_model_1 = __importDefault(require("../models/user-model"));
const comparePassword_1 = __importDefault(require("../utils/comparePassword"));
const createToken_1 = __importDefault(require("../utils/createToken"));
const hashedPassword_1 = __importDefault(require("../utils/hashedPassword"));
const REGISTER = (0, async_middleware_1.asyncMiddleware)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    console.log(req.body);
    // VALIDATE: CHECK IF THE REQUEST BODY HAVE VALUES
    if (!name || !email || !password) {
        throw new errors_1.BadRequestError("Please provide all the valid values");
    }
    // GENERATE: HASHED THE PASSWORD
    const hashedPass = yield (0, hashedPassword_1.default)(password);
    // CREATE:  CREATE A USER WITH USER MODEL WITH CREATE METHOD
    const tempUser = {
        name,
        email,
        password: hashedPass,
    };
    const registeredUser = yield user_model_1.default.create(Object.assign({}, tempUser));
    // EXCLUDE: REMOVE THE PASSWORD
    registeredUser.toJSON = function () {
        const userObject = this.toObject();
        delete userObject.password;
        return userObject;
    };
    // GENERATE: CREATE A TOKEN
    const token = (0, createToken_1.default)(registeredUser);
    // RESPONSE: SENDS BACK RESPONSE TO THE CLIENT
    res.status(http_status_codes_1.StatusCodes.CREATED).json({
        msg: "USER_REGISTERED",
        data: registeredUser,
        token,
    });
}));
exports.REGISTER = REGISTER;
const LOGIN = (0, async_middleware_1.asyncMiddleware)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password: plainPassword } = req.body;
    const authHeader = req.headers.authorization;
    // VALIDATE: CHECK IF THE REQUEST BODY ARE FILLED;
    if (!email || !plainPassword) {
        throw new errors_1.BadRequestError("Please provide all the valid values");
    }
    // CHECK DB: FIND THE ID IN THE DATABSE ||
    const loggedInUser = yield user_model_1.default.findOne({ email });
    console.log(loggedInUser);
    if (!loggedInUser) {
        throw new errors_1.BadRequestError("You provided a non-existing email");
    }
    // COMPARE: COMPARE THE PASSWORD
    yield (0, comparePassword_1.default)(plainPassword, loggedInUser.password);
    // EXCLUDE: OMIT THE PASSWORD BEFORE SENDING BACK THE RESPONSE OBJECT
    loggedInUser.toJSON = function () {
        const userObject = this === null || this === void 0 ? void 0 : this.toObject();
        delete userObject.password;
        return userObject;
    };
    // GENERATE : CREATE TOKEN
    const token = (0, createToken_1.default)(loggedInUser);
    // RESPONSE: SENDS BACK THE RESPONSE | OMIT THE PASSWORD
    res.status(http_status_codes_1.StatusCodes.OK).json({
        msg: "USER_LOGIN",
        data: loggedInUser,
        token,
    });
}));
exports.LOGIN = LOGIN;
