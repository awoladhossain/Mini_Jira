import type { Types } from "mongoose";
import AppError from "../../shared/utils/AppError";
import { signToken } from "../../shared/utils/jwt";
import type { UserRole } from "../user/user.enum";
import User from "../user/user.model";
import { IAuthResponse, ILoginInput, IRegisterInput } from "./auth.interface";

const register = async (data: IRegisterInput): Promise<IAuthResponse> => {
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    throw new AppError("Email already in use", 400);
  }
  const user = await User.create(data);
  const token = signToken({
    userId: user._id as Types.ObjectId,
    email: user.email,
    role: user.role as UserRole,
  });

  return {
    user: {
      _id: user._id as Types.ObjectId,
      name: user.name,
      email: user.email,
      role: user.role as UserRole,
    },
    token,
  };
};
const login = async (data: ILoginInput): Promise<IAuthResponse> => {
  const user = await User.findOne({ email: data.email }).select("+password");
  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }
  const isMatch = await user.comparePassword(data.password);
  if (!isMatch) {
    throw new AppError("Invalid email or password", 401);
  }
  const token = signToken({
    userId: user._id as Types.ObjectId,
    email: user.email,
    role: user.role as UserRole,
  });

  return {
    user: {
      _id: user._id as Types.ObjectId,
      name: user.name,
      email: user.email,
      role: user.role as UserRole,
    },
    token,
  };
};

const getMe = async (userId: string): Promise<object> => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("User not found", 401);
  }
  const { password, ...safeUser } = user.toObject();
  return safeUser;
};

export const AuthService = {
  register,
  login,
  getMe,
};
