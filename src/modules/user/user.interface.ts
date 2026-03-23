import type { Document, Types } from "mongoose";
import type { UserRole, UserStatus } from "./user.enum";

// Base User — pure data shape
export interface IUser {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  status: UserStatus;
  avatar?: string; // ? মানে optional
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserDocument extends IUser, Document {
  _id: Types.ObjectId; // MongoDB এর ObjectId টাইপ
  comparePassword(candidatePassword: string): Promise<boolean>; // পাসওয়ার্ড যাচাই করার মেথড
}

export type SafeUser = Omit<IUser, "password">; // পাসওয়ার্ড ছাড়া ইউজার ডেটা, API রেসপন্সে ব্যবহার করা হবে

export type UpdateUserInput = Partial<Pick<IUser, "name" | "avatar">>; // ইউজার আপডেট করার জন্য ইনপুট, শুধুমাত্র নাম এবং অ্যাভাটার আপডেট করা যাবে

export type LoginInput = Pick<IUser, "email" | "password">; // লগইন ইনপুট, শুধুমাত্র ইমেইল এবং পাসওয়ার্ড প্রয়োজন

export type RegisterInput = Pick<IUser, "name" | "email" | "password">; // রেজিস্ট্রেশন ইনপুট, নাম, ইমেইল এবং পাসওয়ার্ড প্রয়োজন
