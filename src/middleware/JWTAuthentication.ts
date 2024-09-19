import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";
import { sendResponse } from "../utils/responseHandler";

export const jwtAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return sendResponse(req, res, 401, {
      success: false,
      message: "auth.accessDeniedNoToken",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      role: string;
    };

    const user = await User.findById(decoded.id);
    if (!user) {
      return sendResponse(req, res, 401, {
        success: false,
        message: "auth.userNotFound",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return sendResponse(req, res, 401, {
      success: false,
      message: "auth.invalidToken",
    });
  }
};
