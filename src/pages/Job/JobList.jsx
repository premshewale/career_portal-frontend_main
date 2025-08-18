import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import "../../styles/Job/joblist.css";
import { useAuth } from "../../context/AuthContext"; // adjust path if needed
export default function JobsList() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
    const { user } = useAuth();

  useEffect(() => {
    api.get("/jobs/all")
      .then((res) => setJobs(res.data))
      .catch(console.error);
  }, []);

  if (!user) {
    return (
      <div className="home-card" style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Access Denied</h2>
        <p>You must be logged in as a candidate to view this page.</p>
        <a href="/login">Login</a>
      </div>
    );
  }

  return (
    <div className="jobs-grid">
      {jobs.map((job) => (
        <div className="job-card" key={job.id}>
          <h4>{job.title}</h4>
          <p>
            {job.location} • {job.salary}
          </p>
          <button onClick={() => navigate(`/apply/${job.id}`)}>
            Apply
          </button>
        </div>
      ))}
    </div>
  );
}
