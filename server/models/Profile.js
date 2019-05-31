const mongoose = require("mongoose");
const Schema = mongoose.Schema

const profileSchema = new Schema({
  user : {
    type:Schema.Types.ObjectId,
    ref: 'users'
  },
  bio:{
    type:String
  },
  location:{
    type: String,
  },
  skills:{
    type:[String],
    required: true,
  },
  experience : {
    title:{
      type: String,
      required : true
    },
    company:{
      type:String,
      required: true
    }
  },
  education : {
    school:{
      type: String,
      required : true
    },
    degree:{
      type:String,
      required: true
    },
    fieldofstudy:{
      type:String
    },
    current : {
      type: Boolean,
      Default: false
    },
  },
  social: {
    twitter :{
      type: String ,
    },
    facebook :{
      type: String ,
    },
    linkedin :{
      type: String ,
    },    
  },
  date :{
    type: Date,
    default: Date.now
  }

});

const Profile = mongooose.model("Profile", profileSchema);

module.exports = Profile;
