const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const mongoUrl = process.env.MONGO_URL;

exports.config = async (req, res) => {
  try {
    await mongoose.connect(mongoUrl);
    console.log("database connected");
  } catch (error) {
    console.log("error while trying to connect to database ");
  }
};
