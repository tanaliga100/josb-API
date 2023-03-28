import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt, { Secret } from "jsonwebtoken";
import { IRegisterUser } from "../interfaces/all.interfaces";
import { asyncMiddleware } from "../middlewares/asyncMiddleware";
import User from "../models/user-model";

const REGISTER = asyncMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.create({
      ...req.body,
    } as IRegisterUser);
    const token = jwt.sign(
      { userId: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET as Secret as string,
      {
        expiresIn: "1d",
      }
    );
    res.status(StatusCodes.CREATED).json({
      msg: "USER_REGISTERED",
      user: { name: user.name, email: user.email },
      token,
    });
  }
);

const LOGIN = asyncMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send("Login User");
  }
);
export { LOGIN, REGISTER };
