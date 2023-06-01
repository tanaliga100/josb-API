import jwt from "jsonwebtoken";
const createToken = (obj: any) => {
  const { _id, name, email } = obj;
  const secret: string = process.env.JWT_SECRET!;
  const expiration: string = process.env.JWT_EXPIRATION!;
  const token = jwt.sign({ _id, name, email }, secret, {
    expiresIn: expiration,
  });
  return token;
};

export default createToken;
