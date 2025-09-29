const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  dob: {
    type: String,
    required: true,
  },
  otp: {
    type: String
  }
});

module.exports = mongoose.model("User",userSchema)
