import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getGameByIdController } from "../controllers/gamesControllers.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/:gameId", getGameByIdController);

export default router;
