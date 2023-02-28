import express from "express";
import {
  getAllTestsController,
  getTestByIdController,
  addTestController,
  getTestsDetailsController,
} from "../controllers/testsControllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { addTestValidation } from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getAllTestsController);
router.get("/details", getTestsDetailsController);
router.get("/:testId", getTestByIdController);
router.post("/", addTestValidation, addTestController);

export default router;
