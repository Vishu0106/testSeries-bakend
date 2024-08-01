import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
},
  test: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Test', 
    required: true 
},
  score: { 
    type: Number, 
    required: true 
},
  totalScore: { 
    type: Number, 
    required: true
},
   accuracy: { 
    type: Number, 
    required: true
},
  answers: [
    { 
        question: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Question' 
        },
        selectedAnswer: { 
            type: String 
        },
        isCorrect: { 
            type: Boolean 
        }
    }],
},{timestamps:true});

export const Result = mongoose.model('Result', resultSchema);
