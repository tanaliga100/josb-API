import bcrypt from "bcryptjs";
import { BadRequestError } from "../errors";
const comparePassword = async (
  oldPassword: string,
  candidatePassword: string
) => {
  const isValid = await bcrypt.compare(candidatePassword, oldPassword);
  if (!isValid) {
    throw new BadRequestError("Password dont match");
  }
  return isValid;
};

export default comparePassword;
