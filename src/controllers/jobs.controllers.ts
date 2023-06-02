import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors";
import { asyncMiddleware } from "../middlewares/async.middleware";
import Job from "../models/job.model";

const CREATE_JOB = asyncMiddleware(
  async (req: any, res: Response, next: NextFunction) => {
    const { company, position } = req.body;
    // CHECK THE REQUEST BODY
    if (!company || !position) {
      throw new BadRequestError("Company or Position are both required");
    }
    // GET THE ID COMING FROM THE REQ.USER OBJ
    const userId = req.user._id;
    const userName = req.user.name;
    // APPEND THE ID TO THE CREATEDBY PROPERTY
    let tempJob = {
      company,
      position,
      createdBy: userId,
      assocUser: userName,
    };
    // CREATE A JOB
    const job = await Job.create(tempJob);
    // SENDS BACK THE RESPONSE OBJECT TO CLIENT

    res.status(StatusCodes.CREATED).json({ msg: "JOB CREATED", job });
  }
);

const GET_JOBS = asyncMiddleware(
  async (req: any, res: Response, next: NextFunction) => {
    // CHECK THE PAYLOAD
    const userRef = req.user._id;
    // USING FIND.. QUERY THE DATA THAT IS ASSOCIATED WITH REQ.USER._ID
    const jobs = await Job.find({ createdBy: userRef });
    // SENDS BACK RESPONSE

    res
      .status(StatusCodes.OK)
      .json({ msg: "ALL_JOBS", counts: jobs.length, jobs });
  }
);

const GET_JOB = asyncMiddleware(
  async (req: any, res: Response, next: NextFunction) => {
    // CHECK THE ROUTE PARAMS;
    const {
      user: { name: userName },
      params: { id: jobId },
    } = req;
    console.log("USER", userName);

    if (!jobId) {
      throw new BadRequestError("No Job associated with this id:" + jobId);
    }
    // FIND THE JOB ASSOICATED WITH THE REQ.PARAMS
    const job = await Job.find({ _id: jobId });
    if (!job) {
      throw new BadRequestError("Job Not Found");
    }
    // SENDS BACK THE RESPONSE
    res.status(StatusCodes.OK).json({ msg: "SINGLE_JOB ", job });
  }
);

const UPDATE_JOB = asyncMiddleware(
  async (req: any, res: Response, next: NextFunction) => {
    const {
      user: { _id: userId },
      params: { id: jobId },
      body: { company, position, status },
    } = req;

    // VALIDATE THE REQUEST BODY
    if (!company || !position || !status) {
      throw new BadRequestError("Need a new value");
    }
    let tempJob = {
      company,
      position,
      status,
    };

    // QUERY THE DATA USING FINDONEANDUPDATE WITH OPTIONS RUN VALIDATORS
    const updatedJob = await Job.findOneAndUpdate(
      { _id: jobId, createdBy: userId },
      tempJob,
      {
        runValidators: true,
        new: true,
      }
    );
    if (!updatedJob) {
      throw new BadRequestError("No Job associated with this id:" + jobId);
    }

    // SENDS BACK THE RESPONSE
    res.status(StatusCodes.OK).json({ msg: "UPDATED_JOB", updatedJob });
  }
);

const DELETE_JOB = asyncMiddleware(
  async (req: any, res: Response, next: NextFunction) => {
    const {
      user: { _id: userId },
      params: { id: jobId },
    } = req;
    // VALIDATE THE ROUTE PARAMS
    if (!jobId) {
      throw new BadRequestError("No Job associated with this id:" + jobId);
    }
    // QUERY THE DATA USING FINDONEANDDELETE
    const job = await Job.findOneAndDelete({ _id: jobId, createdBy: userId });
    if (!job) {
      throw new BadRequestError(
        "No Job associated with this id:" + jobId + "  ...It might be deleted"
      );
    }
    // SENDS BACK THE RESPONSE

    res.status(StatusCodes.OK).send({ msg: "JOB_DELETED" });
  }
);
export { CREATE_JOB, DELETE_JOB, GET_JOB, GET_JOBS, UPDATE_JOB };
