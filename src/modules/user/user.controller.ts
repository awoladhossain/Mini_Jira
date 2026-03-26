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

const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const user = await UserService.getUserById(req.params.id);

  const response: ApiResponse<SafeUser> = {
    success: true,
    message: "User fetched successfully",
    data: user,
  };

  res.status(200).json(response);
});

const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await UserService.updateUser(req.params.id, req.body);

  const response: ApiResponse<SafeUser> = {
    success: true,
    message: "User updated successfully",
    data: user,
  };

  res.status(200).json(response);
});

const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  await UserService.deleteUser(req.params.id);
  res.status(204).send();
});
export const UserController = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
