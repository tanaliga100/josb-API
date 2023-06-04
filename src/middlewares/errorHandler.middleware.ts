import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const errorHandlerMidlleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // CREATE A CUSTOM OBJECT || SET DEFAULTS
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong",
  };

  // DUPLICATION ERROR
  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, Please choose another value`;
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
