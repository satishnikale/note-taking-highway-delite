const mongoose = require("mongoose");

const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300, // 300 sec i.e 60*5 = 300 (5min)
  },
});

interface otpType {
  email: string;
  otp: string;
}

module.exports = mongoose.model("OTP", OTPSchema);
