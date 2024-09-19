import { Request, Response, NextFunction } from "express";
import { IUser } from "../models/User";
import { sendResponse } from "../utils/responseHandler";

export const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
  if ((req.user as IUser)?.role !== "admin") {
    return sendResponse(req, res, 403, {
      success: false,
      message: "auth.onlyAdminAction",
    });
  }
  next();
};
