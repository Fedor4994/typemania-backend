import { Test } from "../db/testModel.js";
import { getTestsDetails } from "../helpers/testsDetails.js";

export const listTests = async (
  userId,
  page = "1",
  limit = "10",
  sort = -1
) => {
  const skipCount = (page - 1) * limit;

  const tests = await Test.find({ userId })
    .limit(limit)
    .skip(skipCount)
    .sort({ createdAt: sort });
  return tests;
};

export const testsDetails = async (userId) => {
  const allTests = await Test.find({ userId });

  return getTestsDetails(allTests);
};

export const getTestById = async (testId, userId) => {
  const test = await Test.findOne({ _id: testId, userId });
  return test;
};

export const addTest = async (body, userId) => {
  const { wpm, accuracy, time, testType } = body;
  const newTest = new Test({
    wpm,
    accuracy,
    time,
    testType,
    userId,
  });

  const result = newTest.save();
  return result;
};
