import { Request } from "express";
import { ObjectId } from "mongoose";

export type DBResponse<T> = {
  msg: string;
  results: T;
};

export interface IRegisterUser {
  name: string;
  email: string;
  password: string;
  _id: ObjectId;
  __v: number;
}
export interface IUser {
  name: string;
  email: string;
  password: string;
  _id: ObjectId;
  __v: number;
  user: IPayload;
}

export interface IPayload {
  userPayload: { myCustomProperty: string };
}
export interface IUserMethods {
  createJWT: () => void;
  fullName(): string;
}

interface MyRequest extends Request {
  myCustomProperty: string;
  myCustomMethod(): void;
}
