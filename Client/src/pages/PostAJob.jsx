import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./JobPost.css";
import { toast } from "react-toastify";

export const PostAJob = () => {
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    budget: "",
    deadline: "",
    contact: "",
    applyLink: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Handle input
  const handleInput = (e) => {
    const { name, value } = e.target;
    setJobData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ URL validation
  const validateUrl = (url) => {
    const regex = /^(https?:\/\/)[^\s$.?#].[^\s]*$/;
    return regex.test(url);
  };

  // ✅ Email / Phone validation
  const validateContact = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;
    return emailRegex.test(value) || phoneRegex.test(value);
  };

  // ✅ Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    // 🔴 Required validation
    if (
      !jobData.title.trim() ||
      !jobData.description.trim() ||
      !jobData.budget.trim() ||
      !jobData.deadline ||
      !jobData.contact.trim()
    ) {
      toast.error("All fields are required");
      return;
    }

    // 🔴 Contact validation
    if (!validateContact(jobData.contact)) {
      toast.error("Enter valid email or phone number");
      return;
    }

    // 🔴 URL validation (optional)
    if (jobData.applyLink && !validateUrl(jobData.applyLink)) {
      toast.error("Enter valid Apply Link (must start with http/https)");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      });

      let resData;

      // ✅ Safe JSON parsing
      try {
        resData = await response.json();
      } catch {
        resData = {};
      }

      console.log("Status:", response.status);
      console.log("Response:", resData);

      if (response.ok) {
        toast.success(resData.message || "Job posted successfully ✅");

        // ✅ Reset form
        setJobData({
          title: "",
          description: "",
          budget: "",
          deadline: "",
          contact: "",
          applyLink: "",
        });

        // ✅ Redirect after slight delay
        setTimeout(() => {
          navigate("/Home");
        }, 1000);

      } else {
        toast.error(resData.message || "Something went wrong ❌");
      }

    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error("Server not responding ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="job-post-container">
      
      {/* Image */}
      <div className="job-post-image">
        <img
          src="./images/PostaJob.png"
          alt="Job posting"
          width="100%"
        />
      </div>

      {/* Form */}
      <div className="job-post-form">
        <h1>Post a Job</h1>

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
            placeholder="Budget (e.g. ₹5000)"
            value={jobData.budget}
            onChange={handleInput}
            className="job-post-input"
          />

          <input
            type="date"
            name="deadline"
            value={jobData.deadline}
            onChange={handleInput}
            className="job-post-input"
          />

          <input
            type="text"
            name="contact"
            placeholder="Email or Phone"
            value={jobData.contact}
            onChange={handleInput}
            className="job-post-input"
          />

          <input
            type="text"
            name="applyLink"
            placeholder="Apply Link (optional)"
            value={jobData.applyLink}
            onChange={handleInput}
            className="job-post-input"
          />

          <button
            type="submit"
            className="job-post-button"
            disabled={loading}
          >
            {loading ? "Posting..." : "Post Job"}
          </button>

        </form>
      </div>
    </div>
  );
};