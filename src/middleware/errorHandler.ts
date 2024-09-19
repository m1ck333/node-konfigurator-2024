import { Request, Response, NextFunction } from "express";
import { sendResponse } from "../utils/responseHandler";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  return sendResponse(req, res, 500, {
    success: false,
    message: err.message || "common.unexpectedError",
  });
};
