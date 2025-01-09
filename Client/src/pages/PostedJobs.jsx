import React, { useState, useEffect } from "react";

export const PostedJobs = () => {
    const [jobs, setJobs] = useState([]); // User's posted jobs
    const [editingJob, setEditingJob] = useState(null); // Job being edited
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        budget: "",
        deadline: "",
    });

    const fetchPostedJobs = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/user/jobs", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            const data = await response.json();
            setJobs(data);
        } catch (error) {
            console.error("Error fetching posted jobs:", error);
        }
    };

    useEffect(() => {
        fetchPostedJobs();
    }, []);

    const handleEdit = (job) => {
        setEditingJob(job._id);
        setFormData({
            title: job.title,
            description: job.description,
            budget: job.budget,
            deadline: job.deadline,
        });
    };

    const handleDelete = async (jobId) => {
        try {
            await fetch(`http://localhost:5000/api/jobs/${jobId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            setJobs(jobs.filter((job) => job._id !== jobId));
        } catch (error) {
            console.error("Error deleting job:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch(`http://localhost:5000/api/jobs/${editingJob}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(formData),
            });
            setEditingJob(null);
            fetchPostedJobs();
        } catch (error) {
            console.error("Error updating job:", error);
        }
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Poppins, sans-serif" }}>
            <h1>Posted Jobs</h1>
            {editingJob && (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Job Title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                    <textarea
                        placeholder="Description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Budget"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    />
                    <input
                        type="date"
                        value={formData.deadline}
                        onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    />
                    <button type="submit">Update Job</button>
                </form>
            )}
            {jobs.map((job) => (
                <div key={job._id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
                    <h3>{job.title}</h3>
                    <p>{job.description}</p>
                    <p>Budget: ₹{job.budget}</p>
                    <p>Deadline: {new Date(job.deadline).toLocaleDateString()}</p>
                    <button onClick={() => handleEdit(job)}>Edit</button>
                    <button onClick={() => handleDelete(job._id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};
