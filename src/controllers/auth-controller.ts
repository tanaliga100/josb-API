import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt, { Secret } from "jsonwebtoken";
import BadRequestError from "../errors/BadRequestError";
import { IRegisterUser } from "../interfaces/all.interfaces";
import { asyncMiddleware } from "../middlewares/asyncMiddleware";
import User from "../models/user-model";

const REGISTER = asyncMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw new BadRequestError("All fields must be provided");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const tempUser = { name, email, password: hashedPassword };
    const user = await User.create({
      ...tempUser,
    } as IRegisterUser);
    // ISSUED TOKEN HERE...
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
