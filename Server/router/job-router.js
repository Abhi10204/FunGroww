const express = require("express");
const router = express.Router();
const jobControllers = require("../controllers/job-controller");

// Route to fetch all jobs
router.route("/jobs").get(jobControllers.getAllJobs);

// Route to post a new job
router.route("/jobs").post(jobControllers.createJob);

module.exports = router;
