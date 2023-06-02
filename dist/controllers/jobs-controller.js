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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UPDATE_JOB = exports.GET_JOBS = exports.GET_JOB = exports.DELETE_JOB = exports.CREATE_JOB = void 0;
const http_status_codes_1 = require("http-status-codes");
const async_middleware_1 = require("../middlewares/async-middleware");
const CREATE_JOB = (0, async_middleware_1.asyncMiddleware)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.user);
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ msg: "JOB CREATED", obj: req.user });
}));
exports.CREATE_JOB = CREATE_JOB;
const GET_JOBS = (0, async_middleware_1.asyncMiddleware)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "ALL_JOBS", obj: req.user });
}));
exports.GET_JOBS = GET_JOBS;
const GET_JOB = (0, async_middleware_1.asyncMiddleware)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "SINGLE_JOB " });
}));
exports.GET_JOB = GET_JOB;
const UPDATE_JOB = (0, async_middleware_1.asyncMiddleware)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "UPDATED_JOB " });
}));
exports.UPDATE_JOB = UPDATE_JOB;
const DELETE_JOB = (0, async_middleware_1.asyncMiddleware)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(http_status_codes_1.StatusCodes.OK).send({ msg: "JOB_DELETED" });
}));
exports.DELETE_JOB = DELETE_JOB;
