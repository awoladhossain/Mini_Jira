import type { Request, Response } from "express";
import { ApiResponse } from "../../shared/types/response.type";
import asyncHandler from "../../shared/utils/asyncHandler";
import { SafeUser } from "./user.interface";
import { UserService } from "./user.service";

const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await UserService.getAllUsers();
  const response: ApiResponse<SafeUser[]> = {
    success: true,
    message: "Users retrieved successfully",
    data: users,
  };
  res.status(200).json(response);
});

export const UserController = {
  getAllUsers,
};
