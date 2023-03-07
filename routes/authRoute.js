import express from "express";
import {
  loginController,
  registerController,
  getCurrentUserController,
  getLeaderboardController,
  getLeaderboardPlaceController,
  getUserByIdController,
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

router.get("/leaderboard/:userId", getUserByIdController);
router.get("/leaderboard", getLeaderboardController);
router.get("/leaderboard/place", authMiddleware, getLeaderboardPlaceController);

export default router;
