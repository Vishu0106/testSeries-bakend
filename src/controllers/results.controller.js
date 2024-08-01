import {Test} from '../models/test.model.js';
import {Result} from '../models/result.model.js';
import mongoose from 'mongoose';

// Controller for submitting a test and storing the result
const submitTest = async (req, res) => {
  try {
    const { testId, answers } = req.body;
    const objectId = new mongoose.Types.ObjectId(testId);
    console.log("testId",req.body);
    if(!testId || !answers){
        return res
        .status(400)
        .json({ message: 'Please enter all fields'});
        }

    const userId = req.user.id; 
    const test = await Test.findById(objectId);
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }

    console.log(test);
    // Initialize score variables
    let score = 0;
    const totalScore = test.numberOfQuestions * test.marksPerQuestion;

    // Evaluate the answers
    const evaluatedAnswers = answers.map(answer => {
      const question = test.questions.id(answer.questionId);
      console.log("question",question);
      const isCorrect = question.correctAnswer === answer.selectedAnswer;
      if (isCorrect) {
        score += test.marksPerQuestion;
      }
      return {
        question: question._id,
        selectedAnswer: answer.selectedAnswer,
        isCorrect
      };
    });

    // Calculate accuracy
    const accuracy = (score / totalScore) * 100;

    // Create and save the result
    const result = new Result({
      user: userId,
      test: test._id,
      score,
      totalScore,
      accuracy,
      answers: evaluatedAnswers
    });

    await result.save();

    res.status(201).json({
      message: 'Test submitted successfully',
      result
    });
  } catch (error) {
    console.error('Error submitting test:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getResults = async (req, res) => {
    try {
        const userId = req.user.id;
        
        let testId = req.query.id;
        testId = new mongoose.Types.ObjectId(testId);
        const results = await Result.findOne({test:testId,user:userId});
        console.log("results",results);
        res.status(200).json({
            results
        });
    } catch (error) {
        console.error('Error fetching results:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
    }

    const resultsByUser = async (req, res) => {
      try {
        const userId = req.user.id;
    
        // Query results and populate the test field
        const results = await Result.find({ user: userId })
          .populate({
            path: 'test',
            select: 'testName'  // Select only the fields you need from the test
          });
    
        if (!results) {
          return res.status(404).json({ message: 'No results found' });
        }
    
        // Map results to include test name
        const resultsWithTestName = results.map(result => ({
          ...result.toObject(),
          testName: result.test ? result.test.testName : 'Unknown Test'  // Include test name
        }));
    
        res.status(200).json({ results: resultsWithTestName });
      } catch (error) {
        console.error('Error fetching results:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    };
    


export {
    submitTest,
    getResults,
    resultsByUser
}