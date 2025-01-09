const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  budget: { type: String, required: true },
  deadline: { type: Date, required: true },
  contact: { type: String, required: true },
  applyLink: {
    type: String,
    required: false,
  },
}, { timestamps: true });

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;
