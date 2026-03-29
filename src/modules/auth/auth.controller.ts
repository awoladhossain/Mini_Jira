import type { Request, Response } from "express";
import type { ApiResponse } from "../../shared/types/response.type";
import asyncHandler from "../../shared/utils/asyncHandler";
import type { IAuthResponse } from "./auth.interface";
import { AuthService } from "./auth.service";

const register = asyncHandler(async (req: Request, res: Response) => {
  const result = await AuthService.register(req.body);

  const response: ApiResponse<IAuthResponse> = {
    success: true,
    message: "Registration successful",
    data: result,
  };

  res.status(201).json(response);
});

const login = asyncHandler(async (req: Request, res: Response) => {
  const result = await AuthService.login(req.body);

  const response: ApiResponse<IAuthResponse> = {
    success: true,
    message: "Login successful",
    data: result,
  };

  res.status(200).json(response);
});

const getMe = asyncHandler(async (req: Request, res: Response) => {
  // req.user এখন typed — .d.ts এর কারণে
  const userId = req.user!.userId.toString();

  const user = await AuthService.getMe(userId);

  const response: ApiResponse<object> = {
    success: true,
    message: "Profile fetched",
    data: user,
  };

  res.status(200).json(response);
});

export const AuthController = {
  register,
  login,
  getMe,
};
