import express from "express";
import { Test } from "../db/testModel.js";
import { User } from "../db/userModel.js";
import { toHHMMSS } from "../helpers/timeConventer.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  const allTests = await Test.find({});
  const allUsers = await User.find({});

  const details = {
    totalTests: allTests.length,
    totalUsers: allUsers.length,
    totalTime: toHHMMSS(allTests.reduce((acc, test) => acc + test.time, 0)),
  };

  res.json(details);
});

export default router;
