import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { asyncMiddleware } from "../middlewares/async-middleware";

const GET_JOBS = asyncMiddleware(
  async (req: any, res: Response, next: NextFunction) => {
    res.status(StatusCodes.OK).json({ msg: "ALL_JOBS" });
  }
);

const GET_JOB = asyncMiddleware(
  async (req: any, res: Response, next: NextFunction) => {
    res.status(StatusCodes.OK).json({ msg: "SINGLE_JOB " });
  }
);

const CREATE_JOB = asyncMiddleware(
  async (req: any, res: Response, next: NextFunction) => {
    res.status(StatusCodes.CREATED).json({ msg: "JOB CREATED" });
  }
);

const UPDATE_JOB = asyncMiddleware(
  async (req: any, res: Response, next: NextFunction) => {
    res.status(StatusCodes.OK).json({ msg: "UPDATED_JOB " });
  }
);

const DELETE_JOB = asyncMiddleware(
  async (req: any, res: Response, next: NextFunction) => {
    res.status(StatusCodes.OK).send({ msg: "JOB_DELETED" });
  }
);
export { CREATE_JOB, DELETE_JOB, GET_JOB, GET_JOBS, UPDATE_JOB };
