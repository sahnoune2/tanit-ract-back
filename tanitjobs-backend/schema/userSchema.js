const mongoose = require("mongoose");
const { object } = require("webidl-conversions");

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: Number },
  skills: [{ type: String }],
  experience: [
    {
      company: { type: String },
      duration: { type: String },
    },
  ],
  education: [
    {
      university: { type: String },
      duration: { type: String },
    },
  ],
  jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "job" }],
});

const collection = mongoose.model("users", userSchema);

module.exports = collection;
