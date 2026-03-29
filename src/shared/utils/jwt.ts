import jwt, { SignOptions } from "jsonwebtoken";
import { env } from "../../config/env";
import { IJwtPayload } from "../../modules/auth/auth.interface";
import AppError from "./AppError";

// token generation function
export const signToken = (payload: IJwtPayload): string => {
  return jwt.sign(payload as object, env.JWT_SECRET as string, {
    expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"],
  });
};

// token verification function

export const verifyToken = (token: string): IJwtPayload => {
  const decoded = jwt.verify(token, env.JWT_SECRET as string);

  if (typeof decoded === "string") {
    throw new AppError("Invalid token payload", 401);
  }
  return decoded as IJwtPayload;
};
