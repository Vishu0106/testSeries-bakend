import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  questionText: { 
    type: String, 
    required: true 
},
  options: [
    { 
        type: String, 
        required: true 
    }
],
  correctAnswer: { 
    type: String, 
    required: true 
}
});

const testSchema = new mongoose.Schema({
  testName: { 
    type: String, 
    required: true 
},
  numberOfQuestions: { 
    type: Number, 
    required: true 
},
  marksPerQuestion: { 
    type: Number, 
    required: true },
  questions: [questionSchema]
},{timestamps:true});

export const Test = mongoose.model('Test', testSchema);
