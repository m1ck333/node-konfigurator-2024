import { Router } from "express";
import UserController from "../controllers/UserController";
import { checkAdmin } from "../middleware/checkAdmin";
import { validateRequest } from "../middleware/validationMiddleware";
import {
  registerValidationRules,
  updateUserValidationRules,
} from "../validators/authValidators";

const router = Router();

router.post("/register", checkAdmin, registerValidationRules, validateRequest, UserController.register);
router.get("/me", UserController.getMe);
router.get("/user/:id", checkAdmin, UserController.getUserById);
router.get("/users", checkAdmin, UserController.getAllUsers);
router.put("/update/:id", checkAdmin, updateUserValidationRules, validateRequest, UserController.updateUser);
router.delete("/delete/:id", checkAdmin, UserController.deleteUser);

export default router;
