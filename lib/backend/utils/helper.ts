import { compare, hash } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import { Model } from "mongoose";

export const createHashPassword = async (password: string) => {
  const hashPassword = await hash(password, 12);
  return hashPassword;
};

export const verifyHashPassword = async (
  password: string,
  hashPassword: string
) => {
  const verifyPassword = await compare(password, hashPassword);
  return verifyPassword;
};

export const createToken = (data: { id: any; role: string }) => {
  const token = sign(
    { ...data },
    process.env.Token_PRIVATE_KEY || "fdljksgffdlsjgkskjdfgddf",
    {
      expiresIn: "7d",
    }
  );
  return token;
};

export const verifyToken = (token: string) => {
  try {
    const validateResult = verify(
      token,
      process.env.Token_PRIVATE_KEY || "fdljksgffdlsjgkskjdfgddf"
    );
    return validateResult;
  } catch (err) {
    return false;
  }
};

export const findInModelWithId = async (model: any, id: string) => {
  return await model.findOne({ _id: id });
};
