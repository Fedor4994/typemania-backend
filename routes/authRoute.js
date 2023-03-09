import express from "express";
import {
  loginController,
  registerController,
  getCurrentUserController,
  getLeaderboardController,
  getLeaderboardPlaceController,
  getUserByIdController,
  updateUserNameController,
} from "../controllers/authControllers.js";
import { uploadController } from "../controllers/filesControllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { uploadMiddleware } from "../middlewares/filesMiddleware.js";
import {
  loginValidation,
  registerValidation,
  updateUserNameValidation,
} from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.post("/register", registerValidation, registerController);
router.post("/login", loginValidation, loginController);
router.get("/current", authMiddleware, getCurrentUserController);
router.patch(
  "/name",
  authMiddleware,
  updateUserNameValidation,
  updateUserNameController
);
router.patch(
  "/avatars",
  authMiddleware,
  uploadMiddleware.single("avatar"),
  uploadController
);

router.get("/leaderboard", getLeaderboardController);
router.get("/leaderboard/place/:userId", getLeaderboardPlaceController);
router.get("/leaderboard/list/:userId", getUserByIdController);

export default router;
