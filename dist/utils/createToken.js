"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (obj) => {
    const { _id, name, email } = obj;
    const secret = process.env.JWT_SECRET;
    const expiration = process.env.JWT_EXPIRATION;
    const token = jsonwebtoken_1.default.sign({ _id, name, email }, secret, {
        expiresIn: expiration,
    });
    return token;
};
exports.default = createToken;
