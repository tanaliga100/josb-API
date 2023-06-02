"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundMiddleware = void 0;
const http_status_codes_1 = require("http-status-codes");
const notFoundMiddleware = (req, res, next) => {
    res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send(`<h3>Route Does not Exist</h3>
  <a href="/">Go Back</a>`);
};
exports.notFoundMiddleware = notFoundMiddleware;
