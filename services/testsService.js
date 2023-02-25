import { Test } from "../db/testModel.js";

export const listTests = async (userId) => {
  const tests = await Test.find({ userId });
  return tests;
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
