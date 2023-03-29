import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { asyncMiddleware } from "../middlewares/async-middleware";

const CURRENT_USER = asyncMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(StatusCodes.OK).json({ msg: "CURRENT_USER" });
  }
);

export { CURRENT_USER };
