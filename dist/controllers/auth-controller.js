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
const asyncMiddleware_1 = require("../middlewares/asyncMiddleware");
const user_model_1 = __importDefault(require("../models/user-model"));
const REGISTER = (0, asyncMiddleware_1.asyncMiddleware)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // if (!name || !email || !password) {
    //   throw new BadRequestError("All Fields must be provided.");
    // }
    const user = yield user_model_1.default.create(Object.assign({}, req.body));
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ msg: "USER_REGISTERED", user });
}));
exports.REGISTER = REGISTER;
const LOGIN = (0, asyncMiddleware_1.asyncMiddleware)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Login User");
}));
exports.LOGIN = LOGIN;
