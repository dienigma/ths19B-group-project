const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  description: String
});

const Profile = mongooose.model("Profile", profileSchema);

module.exports = Profile;
