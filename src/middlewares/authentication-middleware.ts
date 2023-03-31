import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { UnAuthenticatedError } from "../errors";
import User from "../models/user-model";
const authenticationMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  //CHECK HEADER
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return next(new UnAuthenticatedError("NO TOKEN PROVIDED"));
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload: any = jwt.verify(token, process.env.JWT_SECRET as string);
    console.log({ payload });
    const user = await User.findById(payload.userId).select("-password");
    req.user = user;
    next();
    // next();
    // ATTACH THE USER TO THE JOB ROUTES
  } catch (error) {
    return next(
      new UnAuthenticatedError("NOT AUTHORIZED TO ACCESS THIS ROUTE")
    );
  }
};

export default authenticationMiddleware;
