const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  question: String,
  answer: String
});

const Quiz = mongooose.model("Quiz", quizSchema);

module.exports = Quiz;
