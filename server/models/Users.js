const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type:String,
    required : true
  },
  email: String,
  password: String
});

const User = mongooose.model("User", userSchema);

module.exports = User;
