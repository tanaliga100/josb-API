import { NextFunction, Request, Response } from "express";
import { asyncMiddleware } from "../middlewares/asyncMiddleware";

const GET_JOBS = asyncMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send("All Jobs");
  }
);

const GET_JOB = asyncMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send("Singe Job");
  }
);
const CREATE_JOB = asyncMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send("Create Job");
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
