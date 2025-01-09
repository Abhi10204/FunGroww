import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom"; // Import NavLink

export const HomeLogin = () => {
  const [jobs, setJobs] = useState([]); // To store job listings
  const [searchQuery, setSearchQuery] = useState(""); // To hold the search input

  // Fetching jobs from the backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/jobs");
        const jobData = await response.json();
        setJobs(jobData);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  // Filter jobs based on search query
  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) // Case-insensitive search
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update search query as the user types
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Poppins, sans-serif" }}>
      <h1 style={{ color: "azure", marginBottom: "20px" }}>Job Listings</h1>

      {/* Search Bar */}
      <div style={{ marginBottom: "20px", display: "flex", alignItems: "center" }}>
        <input
          type="text"
          placeholder="Search by Job Title"
          value={searchQuery}
          onChange={handleSearchChange}
          style={{
            padding: "10px",
            fontSize: "16px",
            width: "300px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        
      </div>

      {/* Job Listings Section */}
      <div>
        {filteredJobs.length === 0 ? (
          <p style={{ color: "#888", fontSize: "2rem" }}>No jobs found matching your search.</p>
        ) : (
          filteredJobs.map((job, index) => (
            <div
              key={index}
              style={{
                border: "5px solid #5A2B8F",
                borderRadius: "10px",
                padding: "15px",
                marginBottom: "15px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                backgroundColor: "azure",
                color: "black",
              }}
            >
              <h3
                style={{
                  margin: "0 0 10px",
                  color: "#C85E8C",
                  fontSize: "2rem",
                  fontWeight: "bold",
                }}
              >
                {job.title}
              </h3>
              <p style={{ margin: "0 0 5px", fontSize: "1.5rem" }}>
                {job.description}
              </p>
              <p
                style={{
                  margin: "0 0 5px",
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                }}
              >
                Budget: ₹{job.budget}
              </p>
              <p
                style={{
                  margin: "0 0 5px",
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                }}
              >
                Deadline: {new Date(job.deadline).toLocaleDateString("en-GB")}
              </p>
              <p
                style={{
                  margin: "0",
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                }}
              >
                Contact: {job.contact}
              </p>
              {/* Apply Button  */}
              <NavLink
                to={job.applyLink} 
                style={{
                  display: "inline-block",
                  marginTop: "10px",
                  padding: "10px 20px",
                  backgroundColor: "#C85E8C",
                  color: "white",
                  textDecoration: "none",
                  borderRadius: "5px",
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                }}
              >
                Apply
              </NavLink>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
