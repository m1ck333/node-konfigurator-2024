import { Response, Request } from "express";
import { ValidationError } from "express-validator";

interface ResponseData<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: ValidationError[];
}

export const sendResponse = <T>(
  req: Request,
  res: Response,
  statusCode: number,
  data: ResponseData<T>
) => {
  if (data.message) {
    data.message = req.t(data.message);
  }
  
  res.status(statusCode).json(data);
};
