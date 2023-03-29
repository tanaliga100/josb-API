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
exports.CURRENT_USER = void 0;
const http_status_codes_1 = require("http-status-codes");
const async_middleware_1 = require("../middlewares/async-middleware");
const CURRENT_USER = (0, async_middleware_1.asyncMiddleware)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "CURRENT_USER" });
}));
exports.CURRENT_USER = CURRENT_USER;
