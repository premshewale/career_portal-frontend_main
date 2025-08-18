import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import "../../styles/Job/jobdetails.css";

 

export default function JobDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [resume, setResume] = useState(null);

  useEffect(() => {
      axios.get(`http://localhost:8080/jobs/${id}`)
      .then((res) => setJob(res.data))
      .catch(console.error);
  }, [id]);

  if (!job) return <p>Loading job details...</p>;

  const handleApply = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please login as a candidate to apply.");
      navigate("/login");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      if (resume) formData.append("resume", resume);

      await axios.post(`http://localhost:8080/jobs/${id}/apply`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert("Application submitted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to apply for the job.");
    }
  };

  return (
    <div className="job-details-container">
      <div className="job-card">
        <h2>{job.title}</h2>
        <p className="job-location">Location: {job.location}</p>
        <p className="job-description">Description: {job.description}</p>
        <p><strong>Salary:</strong> {job.salary || "Not disclosed"}</p>
        <p><strong>Posted on:</strong> {job.postedOn}</p>

        <form className="apply-form" onSubmit={handleApply}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setResume(e.target.files[0])}
          />
          <button type="submit" className="apply-btn">Apply Now</button>
        </form>
      </div>
    </div>
  );
}
