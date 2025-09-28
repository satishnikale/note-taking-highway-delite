const { mongoose, Schema } = require("mongoose");

const userSchema = new Schema({
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
    type: Date,
    required: true,
  },
  otp: {
    type: String
  }
});
