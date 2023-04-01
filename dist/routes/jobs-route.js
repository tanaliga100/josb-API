"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsRoute = void 0;
const express_1 = __importDefault(require("express"));
const jobs_controller_1 = require("../controllers/jobs-controller");
const router = express_1.default.Router();
router.route("/").post(jobs_controller_1.CREATE_JOB).get(jobs_controller_1.GET_JOBS);
router.route("/:id").get(jobs_controller_1.GET_JOB).patch(jobs_controller_1.UPDATE_JOB).delete(jobs_controller_1.DELETE_JOB);
exports.JobsRoute = router;
