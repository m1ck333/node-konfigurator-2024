import { Request, Response } from "express";
import AuthService from "../services/AuthService";
import catchAsync from "../utils/catchAsync";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { sanitizeUser } from "../utils/sanitizeUser";
import { sendResponse } from "../utils/responseHandler";

class AuthController {
  public login = catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const { user, accessToken, refreshToken } = await AuthService.login(
        email,
        password
      );
      const userWithoutPassword = sanitizeUser(user);

      return sendResponse(req, res, 200, {
        success: true,
        data: {
          access_token: accessToken,
          refresh_token: refreshToken,
          user: userWithoutPassword,
        },
      });
    } catch (error) {
      return sendResponse(req, res, 401, {
        success: false,
        message: "auth.invalidCredentials",
      });
    }
  });

  public refreshToken = catchAsync(async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return sendResponse(req, res, 401, {
        success: false,
        message: "auth.invalidRefreshToken",
      });
    }

    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET!) as {
        id: string;
      };
      const user = await User.findById(decoded.id);

      if (!user || user.refreshToken !== refreshToken) {
        return sendResponse(req, res, 401, {
          success: false,
          message: "auth.invalidRefreshToken",
        });
      }

      const accessToken = AuthService.generateToken(user, "15m");
      return sendResponse(req, res, 200, {
        success: true,
        data: { access_token: accessToken },
      });
    } catch (error) {
      return sendResponse(req, res, 401, {
        success: false,
        message: "auth.invalidRefreshToken",
      });
    }
  });
}

export default new AuthController();
