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
  user?: IPayload;
}

export interface IPayload {
  userPayload: any;
}
export interface IUserMethods {
  createJWT: () => void;
  fullName(): string;
}

export interface IJobs {
  company: string;
  position: string;
  status: Status[];
  createdBy: string;
}
export type Status = string;
interface MyRequest extends Request {
  myCustomProperty: string;
  myCustomMethod(): void;
}

export interface IQuery {
  position?: string;
  company?: string;
}
