const mongoose = require("mongoose");

exports.dbConnect = () => {
  try {
    const MONGODB_URL = process.env.MONGODB_URL;
    mongoose.connect(MONGODB_URL);

    console.log("Db is connected succesfully");
  } catch (error) {
    console.log("Issue in Db Connection--> ", error);
  }
};
