import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import "../../styles/Company/postjob.css";

export default function EditJob() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState({ title: "", description: "", location: "", salary: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (jobId) {
      api.get(`/jobs/${jobId}`)
        .then((res) => {
          setJob(res.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [jobId]);

  const handleChange = (e) => setJob({ ...job, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    api.put(`/jobs/edit/${jobId}`, job)
      .then(() => navigate("/company/dashboard"))
      .catch((err) => console.error("Error updating job:", err));
  };

  if (loading) return <p style={{ textAlign: "center", marginTop: "100px" }}>Loading...</p>;

  return (
    <div className="postjob-wrapper" style={{ marginTop: "80px" }}>
      <div className="postjob-card">
        <h3>✏️ Edit Job</h3>
        <form onSubmit={handleSubmit}>
          <input name="title" required placeholder="Title" value={job.title} onChange={handleChange} />
          <textarea name="description" required placeholder="Description" value={job.description} onChange={handleChange} />
          <input name="location" placeholder="Location" value={job.location} onChange={handleChange} />
          <input name="salary" placeholder="Salary" value={job.salary} onChange={handleChange} />
          <div className="postjob-actions">
            <button type="submit">💾 Update Job</button>
          </div>
        </form>
      </div>
    </div>
  );
}
