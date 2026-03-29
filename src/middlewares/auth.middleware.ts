import type { NextFunction, Request, Response } from "express";
import { UserRole } from "../modules/user/user.enum";
import AppError from "../shared/utils/AppError";
import asyncHandler from "../shared/utils/asyncHandler";
import { verifyToken } from "../shared/utils/jwt";

export const authenticate = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("Unauthorized: No token provided", 401);
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new AppError("Invalid token format", 401);
    }

    // token verification
    const decoded = verifyToken(token);

    req.user = decoded; // Attach decoded payload to request object
    next();
  },
);

// authorization middleware to check user role

export const authorize = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      throw new AppError("Unauthorized: No user information", 401);
    }

    // check if user role is in the allowed roles
    if (!roles.includes(req.user.role)) {
      throw new AppError(
        `Role '${req.user.role}' is not allowed to access this route`,
        403,
      );
    }
    next();
  };
};
