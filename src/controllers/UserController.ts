import { Request, Response } from "express";
import { IUser } from "../models/User";
import catchAsync from "../utils/catchAsync";
import { sanitizeUser, sanitizeUsers } from "../utils/sanitizeUser";
import { sendResponse } from "../utils/responseHandler";
import UserService from "../services/UserService ";

class UserController {
  public register = catchAsync(async (req: Request, res: Response) => {
    const user = await UserService.register(req.body);
    return sendResponse(req, res, 201, { success: true, data: { user: sanitizeUser(user) } });
  });

  public getMe = catchAsync(async (req: Request, res: Response) => {
    const userId = (req.user as IUser)?.id;
    const user = await UserService.getUserById(userId);
    if (!user) {
      return sendResponse(req, res, 404, { success: false, message: "user.notFound" });
    }
    return sendResponse(req, res, 200, { success: true, data: { user: sanitizeUser(user) } });
  });

  public getUserById = catchAsync(async (req: Request, res: Response) => {
    const userId = req.params.id;
    const user = await UserService.getUserById(userId);
    if (!user) {
      return sendResponse(req, res, 404, { success: false, message: "user.notFound" });
    }
    return sendResponse(req, res, 200, { success: true, data: { user: sanitizeUser(user) } });
  });

  public getAllUsers = catchAsync(async (req: Request, res: Response) => {
    const users = await UserService.getAllUsers();
    return sendResponse(req, res, 200, { success: true, data: { users: sanitizeUsers(users) } });
  });

  public updateUser = catchAsync(async (req: Request, res: Response) => {
    const userId = req.params.id;
    const user = await UserService.updateUser(userId, req.body);
    if (!user) {
      return sendResponse(req, res, 404, { success: false, message: "user.notFound" });
    }
    return sendResponse(req, res, 200, { success: true, data: { user: sanitizeUser(user) } });
  });

  public deleteUser = catchAsync(async (req: Request, res: Response) => {
    const userId = req.params.id;
    await UserService.deleteUser(userId);
    return sendResponse(req, res, 200, { success: true, message: "user.deletedSuccessfully" });
  });
}

export default new UserController();
