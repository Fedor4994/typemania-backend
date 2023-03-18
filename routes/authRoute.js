import express from "express";
import {
  loginController,
  registerController,
  getCurrentUserController,
  verifyController,
  resendEmailController,
  getLeaderboardController,
  getLeaderboardPlaceController,
  getUserByIdController,
  updateUserNameController,
  getAchievementsController,
  changeUserAchievementsController,
} from "../controllers/authControllers.js";
import { uploadController } from "../controllers/filesControllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { uploadMiddleware } from "../middlewares/filesMiddleware.js";
import {
  changeUserAchievementsValidation,
  loginValidation,
  registerValidation,
  resendEmailValidation,
  updateUserNameValidation,
} from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.post("/register", registerValidation, registerController);
router.post("/login", loginValidation, loginController);
router.get("/current", authMiddleware, getCurrentUserController);
router.get("/verify/:verificationToken", verifyController);
router.post("/verify", resendEmailValidation, resendEmailController);
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

router.get("/achievemets/:userId", getAchievementsController);
router.put(
  "/achievemets",
  authMiddleware,
  changeUserAchievementsValidation,
  changeUserAchievementsController
);

export default router;
