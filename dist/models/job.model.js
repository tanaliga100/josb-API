"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const JobSchema = new mongoose_1.default.Schema({
    company: {
        type: String,
        required: true,
        maxlength: 50,
    },
    position: {
        type: String,
        required: true,
        maxlength: 100,
    },
    status: {
        type: String,
        enum: ["interview", "declined", "pending"],
        default: "pending",
    },
    createdBy: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "User",
        required: true,
    },
    assocUser: {
        type: mongoose_1.default.Schema.Types.String,
        ref: "User",
        required: true,
    },
}, { timestamps: true });
const Job = mongoose_1.default.model("Job", JobSchema);
exports.default = Job;
