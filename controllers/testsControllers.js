import {
  listTests,
  getTestById,
  addTest,
  testsDetails,
} from "../services/testsService.js";

export const getAllTestsController = async (req, res, next) => {
  try {
    const { page, limit, sort } = req.query;
    const { _id } = req.user;

    const tests = await listTests(_id, page, limit, sort);
    res.json(tests);
  } catch (error) {
    next(error);
  }
};

export const getTestsDetailsController = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const data = await testsDetails(userId);

    res.json(data);
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
