import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationError } from "express-validator";
import { sendResponse } from "../utils/responseHandler";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendResponse(req, res, 400, {
      success: false,
      message: req.t('validation.invalidRequest'),
      errors: errors.array() as ValidationError[],
    });
  }
  next();
};
