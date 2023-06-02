import bcrypt from "bcryptjs";
import { BadRequestError } from "../errors";
const comparePassword = async (plainPassword: string, oldPassword: string) => {
  const isValid = await bcrypt.compare(plainPassword, oldPassword);
  if (!isValid) {
    throw new BadRequestError("Password dont match");
  }
  return isValid;
};

export default comparePassword;
