const Job = require("../models/job");
const { isURL } = require('validator'); // We use the 'validator' package to check if the URL is valid

// POST: Create a new job
exports.createJob = async (req, res) => {
  const { title, description, budget, deadline, contact, applyLink } = req.body;

  // Validate the applyLink to ensure it's a valid URL
  if (applyLink && !isURL(applyLink)) {
    return res.status(400).json({ error: "Invalid URL format for Apply Link" });
  }

  try {
    const newJob = new Job({
      title,
      description,
      budget,
      deadline,
      contact,
      applyLink,
    });
    await newJob.save();
    res.status(201).json(newJob); // Job created successfully
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).send("Server Error");
  }
};

// GET: Retrieve all jobs
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs); // Return all jobs
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).send("Server Error");
  }
};
