import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IUser } from "../interfaces/all.interfaces";
import { asyncMiddleware } from "../middlewares/async-middleware";
import Job from "../models/job-model";

const GET_JOBS = asyncMiddleware(
  async (req: any, res: Response, next: NextFunction) => {
    // GET THE JOBS ASSOCIATED WITH CURRENT USER;
    console.log("FROM CONTROLLER", req.user);
    const job = await Job.find({ createdBy: req.user._id }).sort("createdAt");
    res
      .status(StatusCodes.OK)
      .json({ msg: "ALL_JOBS", length: job.length, job });
  }
);

const GET_JOB = asyncMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send("Singe Job");
  }
);

const CREATE_JOB = asyncMiddleware(
  async (req: any, res: Response, next: NextFunction) => {
    const { company, position, status } = req.body;
    req.body.createdBy = req.user._id;
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({ job });
  }
);

const UPDATE_JOB = asyncMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send("Update Job");
  }
);

const DELETE_JOB = asyncMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send("Delete Job");
  }
);
export { CREATE_JOB, DELETE_JOB, GET_JOB, GET_JOBS, UPDATE_JOB };
