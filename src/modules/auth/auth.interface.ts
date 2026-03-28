import type { Types } from "mongoose";
import type { UserRole } from "../user/user.enum";

// Interface for JWT payload
export interface IJWTPayload {
  userId: Types.ObjectId;
  email: string;
  role: UserRole;
}

// Interface for registering a new user
export interface IRegisterInput {
  name: string;
  email: string;
  password: string;
}

// Interface for logging ina user
export interface ILoginInput {
  email: string;
  password: string;
}

// interface for login success response
export interface IAuthResponse {
  user: {
    _id: Types.ObjectId;
    name: string;
    email: string;
    role: UserRole;
  };
  token: string;
}
