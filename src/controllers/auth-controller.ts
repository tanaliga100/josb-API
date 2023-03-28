import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, CustomError } from "../errors";
import { asyncMiddleware } from "../middlewares/asyncMiddleware";
import User from "../models/user-model";

const REGISTER = asyncMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    // if (!name || !email || !password) {
    //   throw new BadRequestError("All Fields must be provided.");
    // }
    const user = await User.create({
      ...req.body,
    });
    res.status(StatusCodes.CREATED).json({ msg: "USER_REGISTERED", user });
  }
);

const LOGIN = asyncMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send("Login User");
  }
);
export { LOGIN, REGISTER };
