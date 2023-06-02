import { NextFunction, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UnAuthenticatedError } from "../errors";
import User from "../models/user.model";
import { asyncMiddleware } from "./async.middleware";
const authenticationMiddleware = asyncMiddleware(
  async (req: any, res: Response, next: NextFunction) => {
    // CHECK AUTH-HEADER
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      throw new UnAuthenticatedError("UNAUTHENTICATED: No Token Provided");
    }
    // DECODE THE TOKEN... USING JWT.VERIFY METHOD
    try {
      const authToken = authHeader.split(" ")[1];

      const jwtSecret: string = process.env.JWT_SECRET!;
      const decoded = jwt.verify(authToken, jwtSecret);
      const { name, _id: userId, email } = decoded as JwtPayload;

      // LOOK FOR THE VALUE IN THE DATABASE IF ITS EXISTED;
      const user = await User.find({ _id: userId }).select("-password");
      console.log("USER FROM AUTH", user);

      // PASSED THE DECODED VALUES AS USER OBJECT AND RECEIVES IT IN THE LOGIN CONTROLLER
      req.user = user[0];
      next();
    } catch (error) {
      console.log(error);

      throw new UnAuthenticatedError("UNAUTHORIZED: Authentication Failed");
    }
  }
);
export default authenticationMiddleware;
