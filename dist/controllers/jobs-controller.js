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
const errors_1 = require("../errors");
const async_middleware_1 = require("../middlewares/async-middleware");
const job_model_1 = __importDefault(require("../models/job-model"));
const GET_JOBS = (0, async_middleware_1.asyncMiddleware)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user: { _id: userId }, } = req;
    const { search } = req.query;
    // GET THE JOBS ASSOCIATED WITH CURRENT USER;
    let queryObject = {
        createdBy: userId,
    };
    // SEARCH ALL PROPERTIES
    if (search != undefined && search != "") {
        queryObject = {
            $or: [
                { createdBy: userId, company: { $regex: search, $options: "i" } },
                { createdBy: userId, position: { $regex: search, $options: "i" } },
            ],
        };
    }
    console.log({ queryObject });
    const result = job_model_1.default.find(queryObject);
    if (!result) {
        throw new errors_1.NotFoundError(`WE CANNOT FIND WHAT YOU ARE LOOKING FOR `);
    }
    const job = yield result;
    res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ msg: "ALL_JOBS", length: job === null || job === void 0 ? void 0 : job.length, job });
}));
exports.GET_JOBS = GET_JOBS;
const GET_JOB = (0, async_middleware_1.asyncMiddleware)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user: { _id }, params: { id: jobId }, } = req;
    const job = yield job_model_1.default.findOne({ _id: jobId, createdBy: _id });
    if (!job) {
        throw new errors_1.NotFoundError("NO JOB ASSOCIATED WITH ID :" + jobId);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "SINGLE_JOB ", job });
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
    const { user: { _id }, params: { id: jobId }, body: { company, position }, } = req;
    if (company === "" || position === "") {
        throw new errors_1.BadRequestError("Company or Position must be specified");
    }
    const job = yield job_model_1.default.findOneAndUpdate({ _id: jobId, createdBy: _id }, req.body, {
        new: true,
        runValidators: true,
    });
    if (!job) {
        throw new errors_1.NotFoundError("NO JOB ASSOCIATED WITH ID :" + jobId);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "UPDATED_JOB ", job });
}));
exports.UPDATE_JOB = UPDATE_JOB;
const DELETE_JOB = (0, async_middleware_1.asyncMiddleware)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user: { _id }, params: { id: jobId }, } = req;
    const job = yield job_model_1.default.findOneAndDelete({
        _id: jobId,
        createdBy: _id,
    });
    if (!job) {
        throw new errors_1.NotFoundError(`JOB WITH THIS ID : ${jobId} DOESNT EXIST`);
    }
    const updated = yield job_model_1.default.find({ createdBy: req.user._id }).sort("createdBy");
    res.status(http_status_codes_1.StatusCodes.OK).send({ msg: "JOB_DELETED", updated });
}));
exports.DELETE_JOB = DELETE_JOB;
