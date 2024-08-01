import {Test} from "../models/test.model.js";
import {Result} from "../models/result.model.js";
import mongoose from "mongoose";

// Create Test
const createTest = async (req, res) => {
  const { testName, numberOfQuestions, marksPerQuestion, questions } = req.body;
  if(!testName || !numberOfQuestions || !marksPerQuestion || !questions){
    return res
    .status(400)
    .json({ message: 'Please enter all fields'});
    }
  try {
    const test = new Test({ testName, numberOfQuestions, marksPerQuestion, questions });
    await test.save();
    res.status(201).json({ data:test, message: 'Test created successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Tests
const getAllTests = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch all tests
    const allTests = await Test.find();

    // Fetch all results for the logged-in user
    const userResults = await Result.find({ user: userId }).select('test');

    // Extract the test IDs that the user has already taken
    const takenTestIds = userResults.map(result => result.test.toString());

    // Filter out the tests that the user has already taken
    const tests = allTests.filter(test => !takenTestIds.includes(test._id.toString()));

    res.status(200).json(tests);
  } catch (error) {
    console.error('Error fetching tests:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get Test by ID
const getTestById = async (req, res) => {
  try {
    let { testId } = req.query;
    testId = new mongoose.Types.ObjectId(testId);
    const test = await Test.findById(testId);
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }
    res
    .status(200)
    .json(test);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
    createTest,
    getAllTests,
    getTestById
}