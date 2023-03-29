import bcrypt from "bcryptjs";
import NextFunction from "express";
import jwt from "jsonwebtoken";
import mongoose, { Schema } from "mongoose";
import { IRegisterUser, IUserMethods } from "../interfaces/all.interfaces";
const UserSchema: Schema = new mongoose.Schema({
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
// HASHED PASSWORD BEFORE SUBMITTING
UserSchema.pre("save", async function (): Promise<any> {
  this.password = await bcrypt.hash(this.password, 12);
});
// CREATION OF TOKEN HERE
UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name, email: this.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" }
  );
};
// COMPARE PASSWORD
UserSchema.methods.comparePassword = async function (candidatePassword: any) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};
const User = mongoose.model("Users", UserSchema);
export default User;
