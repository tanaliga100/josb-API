import mongoose from "mongoose";
export const connectDB = (url: any) => {
  return mongoose.connect(url);
};
