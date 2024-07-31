const mongoose = require('mongoose');

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
  answers: [
    { 
        questionId: mongoose.Schema.Types.ObjectId, 
        selectedOption: String 
    }
]
},{timestamps:true});

module.exports = mongoose.model('Result', resultSchema);
