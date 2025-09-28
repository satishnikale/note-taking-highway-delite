const User = require("../models/userModel");

exports.signUp = async (req, res) => {
  try {
    const { name, email, dob, otp } = req.body;

    // validation of above password
    if (!email || !dob || !name || !otp) {
      return res.status(403).json({
        success: false,
        message: "All Field are Required",
      });
    }

    // check email is already present or not
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User is already Registered , Please LoggedIN ",
      });
    }

    // find most resent OTP stored in user --> means DB

    //const response = await OTP.find({ email }).sort({ createdAt: -1 });  // findOne()--> method gives an error
    //const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    const recentOtp = await .findOne({ email }).sort({ createdAt: -1 });

    if (!recentOtp) {
      return res.status(400).json({
        success: false,
        message: "No OTP found for this email",
      });
    }

    console.log("recent OTP in DB _----> ", recentOtp);

    // OTP Expired

    // Expiry check (5 minutes)
    const now = Date.now();
    if ((now - recentOtp.createdAt) / 1000 / 60 > 5) {
      return res.status(400).json({
        success: false,
        message: "OTP expired, please request a new one",
      });
    }

    // Value check (convert both to strings to avoid type mismatch)
    if (otp.toString() !== recentOtp.otp.toString()) {
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    }

    // Hash the Password
    let hasshedPassword = await bcrypt.hash(password, 10);

    // console.log("Password is hashed now ",hasshedPassword);

    // Create the User
    let approved = "";
    accountType === "Instructor" ? (approved = false) : (approved = true);

    // dB Madhe Entry Create karne ahe
    // profile detail la pahile Db madhe entry creat keli --> karan aple additional detail chi _ID --> pass karaychi ahe na signup madhe

    // Create the Additional Profile For User
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });

    // in Db profile detail is not showing whyy ?????????????????????????????????????????? --> Because of
    // console.log("Profile details", profileDetails);

    const user = await User.create({
      firstName,
      lastName,
      email,
      contactNumber,
      password: hasshedPassword,
      accountType,
      approved: approved,
      additionalDetails: profileDetails._id,
      // additionalDetail :profileDetails._id, // yamdhe je profile detail ahe na tyachi id pass keli je profile Detail page
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    // console.log("This Entry is Stored in DataBase",user);

    // response succes send krar a
    return res.status(200).json({
      success: true,
      message: "User is Registered Succesfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "something went Wrong in SignUP !!  User cannot be Registerred , please try again ",
      error: error,
    });
  }
};
