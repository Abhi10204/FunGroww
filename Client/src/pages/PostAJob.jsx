import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./JobPost.css";

export const PostAJob = () => {
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    budget: "",
    deadline: "",
    contact: "",
    applyLink: "", // Add applyLink field
  });
  const [errorMessage, setErrorMessage] = useState(""); // To display error messages
  const [successMessage, setSuccessMessage] = useState(""); // To display success message
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setJobData({
      ...jobData,
      [name]: value,
    });
  };

  const validateUrl = (url) => {
    const regex = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm; // Simple URL validation
    return regex.test(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate applyLink URL
    if (jobData.applyLink && !validateUrl(jobData.applyLink)) {
      setErrorMessage("Please enter a valid URL for the Apply Link.");
      return;
    }

    // Check if all fields are filled
    if (
      jobData.title &&
      jobData.description &&
      jobData.budget &&
      jobData.deadline &&
      jobData.contact &&
      jobData.applyLink // Ensure applyLink is provided
    ) {
      try {
        const response = await fetch("http://localhost:5000/api/jobs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify(jobData),
        });

        if (response.ok) {
          const resData = await response.json();
          console.log("Job posted successfully", resData);

          // Show success message
          setSuccessMessage("Job posted successfully!");

          // Reset form after successful submission
          setJobData({
            title: "",
            description: "",
            budget: "",
            deadline: "",
            contact: "",
            applyLink: "", // Reset applyLink as well
          });

          // Navigate to the HomeLogin page where the job listings are displayed
          setTimeout(() => {
            navigate("/Home");
          }, 2000); // Delay navigation to show the success message
        } else {
          console.error("Failed to post job");
          setErrorMessage("Failed to post job. Please try again.");
        }
      } catch (error) {
        console.error("Error posting job", error);
        setErrorMessage("Error posting job. Please try again later.");
      }
    } else {
      setErrorMessage("Please fill in all fields.");
    }
  };

  return (
    <div className="job-post-container">
      {/* Left side - Image */}
      <div className="job-post-image">
        <img src="./images/PostaJob.png" alt="Job posting" width="100%" height="auto" />
      </div>

      {/* Right side - Form */}
      <div className="job-post-form">
        <h1>Post a Job</h1>
        
        {/* Display Error or Success Messages */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={jobData.title}
            onChange={handleInput}
            className="job-post-input"
          />
          <textarea
            name="description"
            placeholder="Job Description"
            value={jobData.description}
            onChange={handleInput}
            className="job-post-textarea"
          />
          <input
            type="text"
            name="budget"
            placeholder="Budget"
            value={jobData.budget}
            onChange={handleInput}
            className="job-post-input"
          />
          <input
            type="date"
            name="deadline"
            placeholder="Deadline"
            value={jobData.deadline}
            onChange={handleInput}
            className="job-post-input"
          />
          <input
            type="text"
            name="contact"
            placeholder="Contact"
            value={jobData.contact}
            onChange={handleInput}
            className="job-post-input"
          />
          <input
            type="text"
            name="applyLink"
            placeholder="Apply Link"
            value={jobData.applyLink}
            onChange={handleInput}
            className="job-post-input"
          />
          <button type="submit" className="job-post-button">
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
};
