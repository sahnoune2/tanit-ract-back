const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: Number, required: true },
  candidates: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "job" }],
});

const companyCollection = mongoose.model("company", companySchema);

module.exports = companyCollection;
