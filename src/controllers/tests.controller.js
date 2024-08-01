import {Test} from "../models/test.model.js";
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
    const tests = await Test.find();
    res
    .status(200)
    .json(tests);
  } catch (error) {
    res.status(500).json({ message: error.message });
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