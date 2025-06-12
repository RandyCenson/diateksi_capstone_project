const mongoose = require('mongoose');

const checkSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  age: Number,
  bmi: Number,
  glucose: Number,
  pregnancies: Number,
  insulin: Number,
  bloodPressure: Number,
  skinThickness: Number,
  diabetesPedigree: Number,
  result: String,
  createdAt: { type: Date, default: Date.now },
  risk: Number,
  riskCategory: {
    type: String,
    enum: ['low', 'medium', 'high'],
    required: true
  }
});

module.exports = mongoose.model('Check', checkSchema);
