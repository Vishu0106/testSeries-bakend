const mongoose = require('mongoose');

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

module.exports = mongoose.model('Test', testSchema);
