const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://dienigma:Cmj2018!@testclusterone-umiol.mongodb.net/test?retryWrites=true",
  { useNewUrlParser: true }
);

module.exports.User = require("./users");
module.exports.Profile = require("./profile");
module.exports.Quiz = require("./quizzes");
module.exports.Lesson = require("./lessons");
module.exports.Course = require("./course");
