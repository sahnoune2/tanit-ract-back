const mongoose = require("mongoose");

const codeSchema = new mongoose.Schema({
  code: { type: String, required: true },
  name: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: Number },
});
const codeCollection = mongoose.model("codes", codeSchema);

module.exports = codeCollection;
