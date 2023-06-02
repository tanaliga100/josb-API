import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors";
import { asyncMiddleware } from "../middlewares/async-middleware";
import User from "../models/user-model";

const CURRENT_USER = asyncMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: userId } = req.params;
    console.log("PARAMS", req.params);

    const user = await User.find({ _id: userId }).select("-password");
    if (!user) {
      throw new BadRequestError("NO Users found");
    }
    res.status(StatusCodes.OK).json({ msg: "CURRENT_USER", user });
  }
);
const ALL_USERS = asyncMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.find({}).select("-password");
    if (!users) {
      throw new BadRequestError("NO Users found");
    }
    res.status(StatusCodes.OK).json({ msg: "ALL USERS", users });
  }
);

export { ALL_USERS, CURRENT_USER };
