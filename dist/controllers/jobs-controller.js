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
const asyncMiddleware_1 = require("../middlewares/asyncMiddleware");
const GET_JOBS = (0, asyncMiddleware_1.asyncMiddleware)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("All Jobs");
}));
exports.GET_JOBS = GET_JOBS;
const GET_JOB = (0, asyncMiddleware_1.asyncMiddleware)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Singe Job");
}));
exports.GET_JOB = GET_JOB;
const CREATE_JOB = (0, asyncMiddleware_1.asyncMiddleware)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Create Job");
}));
exports.CREATE_JOB = CREATE_JOB;
const UPDATE_JOB = (0, asyncMiddleware_1.asyncMiddleware)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Update Job");
}));
exports.UPDATE_JOB = UPDATE_JOB;
const DELETE_JOB = (0, asyncMiddleware_1.asyncMiddleware)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Delete Job");
}));
exports.DELETE_JOB = DELETE_JOB;
