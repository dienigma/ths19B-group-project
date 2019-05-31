const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: {
    type:String,
  },
  description: {
    type:String
  },

  
});

const Course = mongooose.model("Course", courseSchema);

module.exports = Course;
