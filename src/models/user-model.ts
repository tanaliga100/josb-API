import bcrypt from "bcryptjs";
import NextFunction from "express";
import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "Please provide a email"],
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Please provide a valid email address",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a valid password"],
    minlength: 6,
    maxlength: 100,
  },
});
UserSchema.pre("save", async function (): Promise<any> {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
const User = mongoose.model("Users", UserSchema);
export default User;
