import { listTests, getTestById, addTest } from "../services/testsService.js";

export const getAllTestsController = async (req, res, next) => {
  try {
    const tests = await listTests(req.user._id);
    res.json(tests);
  } catch (error) {
    next(error);
  }
};

export const getTestByIdController = async (req, res, next) => {
  try {
    const test = await getTestById(req.params.testId, req.user._id);
    test ? res.json(test) : res.status(404).json({ message: "Not found" });
  } catch (error) {
    next(error);
  }
};
export const addTestController = async (req, res, next) => {
  try {
    const newTest = await addTest(req.body, req.user._id);
    res.status(201).json(newTest);
  } catch (error) {
    next(error);
  }
};
