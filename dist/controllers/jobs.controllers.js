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
const async_middleware_1 = require("../middlewares/async.middleware");
const job_model_1 = __importDefault(require("../models/job.model"));
const CREATE_JOB = (0, async_middleware_1.asyncMiddleware)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { company, position } = req.body;
    // CHECK THE REQUEST BODY
    if (!company || !position) {
        throw new errors_1.BadRequestError("Company or Position are both required");
    }
    // GET THE ID COMING FROM THE REQ.USER OBJ
    const userId = req.user._id;
    const userName = req.user.name;
    // APPEND THE ID TO THE CREATEDBY PROPERTY
    let tempJob = {
        company,
        position,
        createdBy: userId,
        assocUser: userName,
    };
    // CREATE A JOB
    const job = yield job_model_1.default.create(tempJob);
    // SENDS BACK THE RESPONSE OBJECT TO CLIENT
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ msg: "JOB CREATED", job });
}));
exports.CREATE_JOB = CREATE_JOB;
const GET_JOBS = (0, async_middleware_1.asyncMiddleware)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // CHECK THE PAYLOAD
    const userRef = req.user._id;
    // USING FIND.. QUERY THE DATA THAT IS ASSOCIATED WITH REQ.USER._ID
    const jobs = yield job_model_1.default.find({ createdBy: userRef });
    // SENDS BACK RESPONSE
    res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ msg: "ALL_JOBS", counts: jobs.length, jobs });
}));
exports.GET_JOBS = GET_JOBS;
const GET_JOB = (0, async_middleware_1.asyncMiddleware)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // CHECK THE ROUTE PARAMS;
    const { user: { name: userName }, params: { id: jobId }, } = req;
    console.log("USER", userName);
    if (!jobId) {
        throw new errors_1.BadRequestError("No Job associated with this id:" + jobId);
    }
    // FIND THE JOB ASSOICATED WITH THE REQ.PARAMS
    const job = yield job_model_1.default.find({ _id: jobId });
    if (!job) {
        throw new errors_1.BadRequestError("Job Not Found");
    }
    // SENDS BACK THE RESPONSE
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "SINGLE_JOB ", job });
}));
exports.GET_JOB = GET_JOB;
const UPDATE_JOB = (0, async_middleware_1.asyncMiddleware)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user: { _id: userId }, params: { id: jobId }, body: { company, position, status }, } = req;
    // VALIDATE THE REQUEST BODY
    if (!company || !position || !status) {
        throw new errors_1.BadRequestError("Need a new value");
    }
    let tempJob = {
        company,
        position,
        status,
    };
    // QUERY THE DATA USING FINDONEANDUPDATE WITH OPTIONS RUN VALIDATORS
    const updatedJob = yield job_model_1.default.findOneAndUpdate({ _id: jobId, createdBy: userId }, tempJob, {
        runValidators: true,
        new: true,
    });
    if (!updatedJob) {
        throw new errors_1.BadRequestError("No Job associated with this id:" + jobId);
    }
    // SENDS BACK THE RESPONSE
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "UPDATED_JOB", updatedJob });
}));
exports.UPDATE_JOB = UPDATE_JOB;
const DELETE_JOB = (0, async_middleware_1.asyncMiddleware)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user: { _id: userId }, params: { id: jobId }, } = req;
    // VALIDATE THE ROUTE PARAMS
    if (!jobId) {
        throw new errors_1.BadRequestError("No Job associated with this id:" + jobId);
    }
    // QUERY THE DATA USING FINDONEANDDELETE
    const job = yield job_model_1.default.findOneAndDelete({ _id: jobId, createdBy: userId });
    if (!job) {
        throw new errors_1.BadRequestError("No Job associated with this id:" + jobId + "  ...It might be deleted");
    }
    // SENDS BACK THE RESPONSE
    res.status(http_status_codes_1.StatusCodes.OK).send({ msg: "JOB_DELETED" });
}));
exports.DELETE_JOB = DELETE_JOB;
