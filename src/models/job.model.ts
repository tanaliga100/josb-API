import mongoose, { Schema } from "mongoose";
const JobSchema: Schema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
      maxlength: 50,
    },
    position: {
      type: String,
      required: true,
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assocUser: {
      type: mongoose.Schema.Types.String,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", JobSchema);
export default Job;
