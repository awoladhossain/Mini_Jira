import AppError from "../../shared/utils/AppError";
import type { SafeUser, UpdateUserInput } from "./user.interface";
import User from "./user.model";

const sanitizeUser = (user: any): SafeUser => {
  const { password, ...safeUser } = user.toObject(); // password ফিল্ড বাদ দিয়ে বাকি সব ফিল্ড safeUser তে রাখবে
  return safeUser as SafeUser; // Type assertion দিয়ে SafeUser টাইপে কাস্ট করা
};

const getAllUsers = async (): Promise<SafeUser[]> => {
  const users = await User.find({ status: "active" }); // active ইউজার গুলো খুঁজে বের করবে
  return users.map(sanitizeUser); // প্রতিটি ইউজারকে sanitizeUser ফাংশনের মাধ্যমে SafeUser তে রূপান্তর করবে
};
const getUserById = async (id: string): Promise<SafeUser> => {
  const user = await User.findById(id);
  if (!user) {
    throw new AppError("User not found", 404);
  }
  return sanitizeUser(user);
};

const updateUser = async (
  id: string,
  data: UpdateUserInput,
): Promise<SafeUser> => {
  const user = await User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    throw new AppError("User not found", 404);
  }
  return sanitizeUser(user);
};

const deleteUser = async (id: string): Promise<void> => {
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw new AppError("User not found", 404);
  }
};

export const UserService = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
