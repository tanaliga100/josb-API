"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMidlleware = void 0;
const http_status_codes_1 = require("http-status-codes");
const errorHandlerMidlleware = (err, req, res, next) => {
    // CREATE A CUSTOM OBJECT || SET DEFAULTS
    let customError = {
        statusCode: err.statusCode || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || "Something went wrong",
    };
    // DUPLICATION ERROR
    if (err.code && err.code === 11000) {
        customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, Please choose another value`;
        customError.statusCode = 400;
    }
    // if (err.name && err.name === "ValidationError") {
    //   customError.msg = `Duplicate value entered for ${Object.keys(
    //     err.keyValue
    //   )} field, Please choose another value`;
    //   customError.statusCode = 400;
    // }
    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
    return res
        .status(customError.statusCode)
        .json({ msg: customError.msg, statusCode: customError.statusCode });
};
exports.errorHandlerMidlleware = errorHandlerMidlleware;
//  let customError = {
//    // SET DEFAULT
//    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
//    msg: err.message || "Something went wrong",
//  };
//  // VALIDATION ERROR HANDLER
//  if (err.name === "ValidationError") {
//    console.log(Object.values(err.errors));
//    customError.msg = Object.values(err.errors).map((item: any) => item.message);
//    customError.statusCode = StatusCodes.BAD_REQUEST;
//  }
//  // DUPLICATE ERROR HANDLER
//  if (err.code && err.code === 11000) {
//    customError.msg = `DUPLICATE VALUE ENTERED FOR ${Object.keys(
//      err.keyValue
//    )} FIELD... Please choose another email address`;
//    customError.statusCode = StatusCodes.BAD_REQUEST;
//  }
//  // CAST ERROR HANDLER
//  if (err.name === "CastError") {
//    customError.statusCode = StatusCodes.NOT_FOUND;
//    customError.msg = `NO ITEM FOUND WITH ID: ${err.value} `;
//  }
//  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
//  return res.status(customError.statusCode).json({ msg: customError });
