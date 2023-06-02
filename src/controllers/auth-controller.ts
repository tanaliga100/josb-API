import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors";
import { asyncMiddleware } from "../middlewares/async-middleware";
import User from "../models/user-model";
import comparePassword from "../utils/comparePassword";
import createToken from "../utils/createToken";
import hashedPassword from "../utils/hashedPassword";

const REGISTER = asyncMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;
    console.log(req.body);
    // VALIDATE: CHECK IF THE REQUEST BODY HAVE VALUES
    if (!name || !email || !password) {
      throw new BadRequestError("Please provide all the valid values");
    }
    // GENERATE: HASHED THE PASSWORD
    const hashedPass = await hashedPassword(password);
    // CREATE:  CREATE A USER WITH USER MODEL WITH CREATE METHOD
    const tempUser = {
      name,
      email,
      password: hashedPass,
    };

    const registeredUser = await User.create({ ...tempUser });
    // EXCLUDE: REMOVE THE PASSWORD
    registeredUser.toJSON = function () {
      const userObject = this.toObject();
      delete userObject.password;
      return userObject;
    };
    // GENERATE: CREATE A TOKEN
    const token = createToken(registeredUser);
    // RESPONSE: SENDS BACK RESPONSE TO THE CLIENT
    res.status(StatusCodes.CREATED).json({
      msg: "USER_REGISTERED",
      data: registeredUser,
      token,
    });
  }
);

const LOGIN = asyncMiddleware(
  async (req: any, res: Response, next: NextFunction) => {
    const { email, password: plainPassword } = req.body;
    const authHeader = req.headers.authorization;
    // VALIDATE: CHECK IF THE REQUEST BODY ARE FILLED;
    if (!email || !plainPassword) {
      throw new BadRequestError("Please provide all the valid values");
    }
    // CHECK DB: FIND THE ID IN THE DATABSE ||
    const loggedInUser = await User.findOne({ email });

    if (!loggedInUser) {
      throw new BadRequestError("You provided a non-existing email");
    }
    // COMPARE: COMPARE THE PASSWORD
    await comparePassword(plainPassword, loggedInUser.password);
    // EXCLUDE: OMIT THE PASSWORD BEFORE SENDING BACK THE RESPONSE OBJECT
    loggedInUser.toJSON = function () {
      const userObject = this?.toObject();
      delete userObject.password;
      return userObject;
    };
    // GENERATE : CREATE TOKEN
    const token = createToken(loggedInUser);
    // RESPONSE: SENDS BACK THE RESPONSE | OMIT THE PASSWORD
    res.status(StatusCodes.OK).json({
      msg: "USER_LOGIN",
      data: loggedInUser,
      token,
    });
  }
);

const LOGOUT = asyncMiddleware(
  async (req: any, res: Response, next: NextFunction) => {
    res.status(StatusCodes.OK).json({
      msg: "USER_LOGGED_OUT",
    });
  }
);

export { LOGIN, LOGOUT, REGISTER };
