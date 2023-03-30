import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors";
import { asyncMiddleware } from "../middlewares/async-middleware";
import Job from "../models/job-model";

const GET_JOBS = asyncMiddleware(
  async (req: any, res: Response, next: NextFunction) => {
    const {
      user: { _id: userId },
    } = req;
    const { search } = req.query;
    // GET THE JOBS ASSOCIATED WITH CURRENT USER;
    let queryObject: any = {
      createdBy: userId,
    };
    // SEARCH ALL PROPERTIES
    if (search != undefined && search != "") {
      queryObject = {
        $or: [
          { createdBy: userId, company: { $regex: search, $options: "i" } },
          { createdBy: userId, position: { $regex: search, $options: "i" } },
        ],
      };
    }
    console.log({ queryObject });

    const result = Job.find(queryObject);
    if (!result) {
      throw new NotFoundError(`WE CANNOT FIND WHAT YOU ARE LOOKING FOR `);
    }
    const job = await result;
    res
      .status(StatusCodes.OK)
      .json({ msg: "ALL_JOBS", length: job?.length, job });
  }
);

const GET_JOB = asyncMiddleware(
  async (req: any, res: Response, next: NextFunction) => {
    const {
      user: { _id },
      params: { id: jobId },
    } = req;
    const job = await Job.findOne({ _id: jobId, createdBy: _id });
    if (!job) {
      throw new NotFoundError("NO JOB ASSOCIATED WITH ID :" + jobId);
    }
    res.status(StatusCodes.OK).json({ msg: "SINGLE_JOB ", job });
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
  async (req: any, res: Response, next: NextFunction) => {
    const {
      user: { _id },
      params: { id: jobId },
      body: { company, position },
    } = req;
    if (company === "" || position === "") {
      throw new BadRequestError("Company or Position must be specified");
    }
    const job = await Job.findOneAndUpdate(
      { _id: jobId, createdBy: _id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!job) {
      throw new NotFoundError("NO JOB ASSOCIATED WITH ID :" + jobId);
    }
    res.status(StatusCodes.OK).json({ msg: "UPDATED_JOB ", job });
  }
);

const DELETE_JOB = asyncMiddleware(
  async (req: any, res: Response, next: NextFunction) => {
    const {
      user: { _id },
      params: { id: jobId },
    } = req;
    const job = await Job.findOneAndDelete({
      _id: jobId,
      createdBy: _id,
    });
    if (!job) {
      throw new NotFoundError(`JOB WITH THIS ID : ${jobId} DOESNT EXIST`);
    }
    const updated = await Job.find({ createdBy: req.user._id }).sort(
      "createdBy"
    );
    res.status(StatusCodes.OK).send({ msg: "JOB_DELETED", updated });
  }
);
export { CREATE_JOB, DELETE_JOB, GET_JOB, GET_JOBS, UPDATE_JOB };
