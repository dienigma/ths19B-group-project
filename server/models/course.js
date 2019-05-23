const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: String,
  description: String
});

const Course = mongooose.model("Course", courseSchema);

module.exports = Course;
