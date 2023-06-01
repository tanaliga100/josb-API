import bcrypt from "bcryptjs";

const hashedPassword = async (candidatePass: string) => {
  const salt = await bcrypt.genSalt(6);
  const hashedPass = await bcrypt.hash(candidatePass, salt);
  return hashedPass;
};

export default hashedPassword;
