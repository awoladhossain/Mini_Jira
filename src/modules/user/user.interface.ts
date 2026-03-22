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
