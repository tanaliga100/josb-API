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

export interface IUserMethods {
  createJWT: () => void;
  fullName(): string;
}
