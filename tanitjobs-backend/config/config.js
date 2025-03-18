const mongoose = require("mongoose");

exports.config = async (req, res) => {
  try {
    await mongoose.connect(
      "mongodb+srv://krimiseif140:VAqweZMrXclUEZCO@cluster0.nk16i.mongodb.net/Tanit-backend"
    );
    console.log("database connected");
  } catch (error) {
    console.log("error while trying to connect to database ");
  }
};
