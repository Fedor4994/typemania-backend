import express from "express";
import {
  loginController,
  registerController,
  getCurrentUserController
} from "../controllers/authControllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  loginValidation,
  registerValidation,
} from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.post("/register", registerValidation, registerController);
router.post("/login", loginValidation, loginController);
router.get("/current", authMiddleware, getCurrentUserController);

export default router;
