import { Router, Request, Response } from "express";
import { sendResponse } from "../utils/responseHandler";

const router = Router();

router.get("/test", (req: Request, res: Response) => {
  return sendResponse(req, res, 200, {
    success: true,
    message: "Hello World!",
  });
});

export default router;
