import { Router } from "express";
import AuthController from "../controllers/AuthController";
import { validateRequest } from "../middleware/validationMiddleware";
import { loginValidationRules } from "../validators/authValidators";

const router = Router();

router.post("/login", loginValidationRules, validateRequest, AuthController.login);
router.post("/refresh-token", AuthController.refreshToken);

export default router;
