const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  companyID: { type: mongoose.Schema.Types.ObjectId, ref: "company" },
  description: { type: String, required: true },
  title: { type: String, required: true },
  requirements: { type: String, required: true },
  location: { type: String, required: true },
  users: [{ type: mongoose.Schema.Types.ObjectId,ref:"users"}],
});

const jobCollection = mongoose.model("job", jobSchema);

module.exports = jobCollection;
