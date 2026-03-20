import type { NextFunction, Request, Response } from "express";
import { env } from "../config/env";
import AppError from "../shared/utils/AppError";
const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
    return;
  }
  res.status(500).json({
    success: false,
    message:
      env.NODE_ENV === "development" ? err.message : "Something went wrong",
  });
};

export default errorMiddleware;
