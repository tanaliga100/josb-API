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
exports.CURRENT_USER = exports.ALL_USERS = void 0;
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const async_middleware_1 = require("../middlewares/async.middleware");
const user_model_1 = __importDefault(require("../models/user.model"));
const CURRENT_USER = (0, async_middleware_1.asyncMiddleware)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: userId } = req.params;
    console.log("PARAMS", req.params);
    const user = yield user_model_1.default.find({ _id: userId }).select("-password");
    if (!user) {
        throw new errors_1.BadRequestError("NO Users found");
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "CURRENT_USER", user });
}));
exports.CURRENT_USER = CURRENT_USER;
const ALL_USERS = (0, async_middleware_1.asyncMiddleware)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.default.find({}).select("-password");
    if (!users) {
        throw new errors_1.BadRequestError("NO Users found");
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "ALL USERS", users });
}));
exports.ALL_USERS = ALL_USERS;
