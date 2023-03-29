import express, { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CustomError } from "../errors";

export const errorHandlerMidlleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err instanceof CustomError ? "custom error" : "fallback error");
  if (err instanceof CustomError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: {
        message: err.message,
        statusCode: StatusCodes.BAD_REQUEST,
      },
    });
  }
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
};
