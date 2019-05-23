const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const Lesson = mongooose.model("Lesson", lessonSchema);

module.exports = Lesson;
