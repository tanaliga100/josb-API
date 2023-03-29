import bcrypt, { hash } from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt, { Secret } from "jsonwebtoken";
import { CustomError, UnAuthenticatedError } from "../errors";
import BadRequestError from "../errors/BadRequestError";
import { IRegisterUser } from "../interfaces/all.interfaces";
import { asyncMiddleware } from "../middlewares/async-middleware";
import User from "../models/user-model";

const REGISTER = asyncMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;
    // PASSWORD HASHED IN MODEL SCHEMA
    const user = await User.create({ ...req.body });
    // TOKEN GENERATED IN MODEL SCHEMA
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({
      msg: "USER_REGISTERED",
      user: { name: user.name, email: user.email },
      token,
    });
  }
);

const LOGIN = asyncMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    // CHECK REQUEST BODY
    if (!email || !password) {
      throw new BadRequestError("");
    }
    // FIND EXISTING EMAIL
    const user = await User.findOne({ email });
    // IF NOT FOUND THROW ERROR
    if (!user) {
      throw new UnAuthenticatedError(
        `No user associated with the email: ${email}`
      );
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new UnAuthenticatedError(`Password dont match`);
    }
    // RELEASED TOKEN HERE
    const token = user.createJWT();
    // SEND BACK RESPONSE TO THE CLIENT
    res.status(StatusCodes.OK).json({
      msg: "USER_LOGIN",
      user: { name: user.name, email: user.email },
      token,
    });
  }
);

export { LOGIN, REGISTER };
