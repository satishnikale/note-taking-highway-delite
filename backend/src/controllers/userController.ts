const User = require("../models/userModel");
const OTP = require("../models/OTPModel");
import jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
const otpTemplate = require("../utils/template");


// const MailerSend = require("@mailersend/mailersend");
require("dotenv").config();

import type { Request, Response } from "express";

interface UserType {
  name: string;
  email: string;
  dob: Date;
  otp: string;
}

exports.signUp = async (req: Request, res: Response) => {
  try {
    const { name, email, dob, otp }: UserType = req.body;

    // 1. Validate inputs
    if (!email || !dob || !name || !otp) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 2. Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already registered. Please log in.",
      });
    }

    // 3. Get most recent OTP
    const recentOtp = await OTP.findOne({ email }).sort({ createdAt: -1 });
    if (!recentOtp) {
      return res.status(400).json({
        success: false,
        message: "No OTP found for this email",
      });
    }

    // 4. Verify OTP
    if (otp !== recentOtp.otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP , Enter a valid OTP ",
      });
    }

    // 5. Create user
    const user = await User.create({ name, email, dob });

    // 6. Clear OTPs for this email
    await OTP.deleteMany({ email });

    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      user,

    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong in signup",
      error,
    });
  }
};

exports.login = async (req: Request, res: Response) => {
  try {
    console.log("Hitting login route");
    // 1. get email form body
    const { email, otp } = req.body;

    // 2. validation on email
    if (!email || !otp) {
      return res.status(403).json({
        success: false,
        message: "All fields are required ",
      });
    }
    //3/ check user is present in db
    const user = await User.findOne({ email });
    console.log("getting user--->", user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User is not found , Signup First",
      });
    }

    //4. validate OTP
    const recentOtp = await OTP.findOne({ email }).sort({ createdAt: -1 });

    console.log("recent OTP");

    if (otp !== recentOtp.otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP , Enter a valid OTP ",
      });
    }

    // 5. create JWT
    const payload = {
      id: user._id,
      email: email,
    };

    const JWT_SCERET: any = process.env.JWT_SCERET;
    console.log("print JWT secret -->", JWT_SCERET);

    const token = jwt.sign(payload, JWT_SCERET, { expiresIn: "3d" });

    console.log("Pringitng the token --->", token);

    //6. login sucesfully
    return res.status(200).json({
      success: true,
      message: "User Logged in succesfully",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      messaga: "Something went wrong while Login ",
    });
  }
};

exports.sendOTP = async (req: Request, res: Response) => {
  try {
    console.log("i am inside OTP sender ");
    // 1. get email
     const {email} = req.body;
    //const email = "balajiborude2503@gmail.com";

    console.log("jay nbaba ki emil--", email  );

    // validation
    if (!email) {
      return res.status(403).json({
        success: false,
        message: "Enter a valid Email Addresss",
      });
    }
    console.log("email from OTP ", email);

    // 2. generate  OTP
    let generateotp = Math.floor(1000 + Math.random() * 9000);
    console.log(generateotp);

    // 3. save OTP in Db
    const saveOtp = await OTP.create({
      otp: generateotp,
      email,
    });
    console.log("OTP save in DB ");

    console.log("email from otp ", email);
    // send email
    let result = await mailSender({
      email,
      title: "Verification Email from satish",
      body: otpTemplate(generateotp),
    });

    console.log("after mail is send ");
    console.log("response of mail", result);
    console.log(`Mail send to email ${email} succesfully`);
    // return res
    return res.status(200).json({
      success: true,
      message: "OTP save in db  and email is send to User Succesfully",
      otp: generateotp,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error,
      message: "Issue in OTP Generation ",
    });
  }
};
