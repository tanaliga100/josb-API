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
exports.UPDATE_JOB = exports.GET_JOBS = exports.GET_JOB = exports.DELETE_JOB = exports.CREATE_JOB = void 0;
const http_status_codes_1 = require("http-status-codes");
const async_middleware_1 = require("../middlewares/async-middleware");
const job_model_1 = __importDefault(require("../models/job-model"));
const GET_JOBS = (0, async_middleware_1.asyncMiddleware)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // GET THE JOBS ASSOCIATED WITH CURRENT USER;
    console.log("FROM CONTROLLER", req.user);
    const job = yield job_model_1.default.find({ createdBy: req.user._id }).sort("createdAt");
    res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ msg: "ALL_JOBS", length: job.length, job });
}));
exports.GET_JOBS = GET_JOBS;
const GET_JOB = (0, async_middleware_1.asyncMiddleware)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Singe Job");
}));
exports.GET_JOB = GET_JOB;
const CREATE_JOB = (0, async_middleware_1.asyncMiddleware)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { company, position, status } = req.body;
    req.body.createdBy = req.user._id;
    const job = yield job_model_1.default.create(req.body);
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ job });
}));
exports.CREATE_JOB = CREATE_JOB;
const UPDATE_JOB = (0, async_middleware_1.asyncMiddleware)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Update Job");
}));
exports.UPDATE_JOB = UPDATE_JOB;
const DELETE_JOB = (0, async_middleware_1.asyncMiddleware)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Delete Job");
}));
exports.DELETE_JOB = DELETE_JOB;
