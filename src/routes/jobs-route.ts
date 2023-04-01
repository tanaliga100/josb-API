import express from "express";
import {
  CREATE_JOB,
  DELETE_JOB,
  GET_JOB,
  GET_JOBS,
  UPDATE_JOB,
} from "../controllers/jobs-controller";
const router = express.Router();

router.route("/").post(CREATE_JOB).get(GET_JOBS);
router.route("/:id").get(GET_JOB).patch(UPDATE_JOB).delete(DELETE_JOB);

export const JobsRoute = router;
