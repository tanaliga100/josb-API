import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { asyncMiddleware } from "../middlewares/async-middleware";

const REGISTER = asyncMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;
    console.log(req.body);

    res.status(StatusCodes.CREATED).json({
      msg: "USER_REGISTERED",
    });
  }
);

const LOGIN = asyncMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    console.log(req.body);

    res.status(StatusCodes.OK).json({
      msg: "USER_LOGIN",
    });
  }
);

export { LOGIN, REGISTER };
