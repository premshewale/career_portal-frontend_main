// CompanyDashboard.jsx
import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../../styles/Company/dashboard.css";


export default function CompanyDashboard(){
  const { company } = useAuth();
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    if (!company?.id) return;
    api.get(`/jobs/company/${company.id}`).then(res => setJobs(res.data)).catch(console.error);
  },[company?.id]);

  const deleteJob = (id) => {
    if (!window.confirm("Delete this job?")) return;
    api.delete(`/jobs/${id}`).then(()=> setJobs(jobs.filter(j=> j.id !== id)));
  };

  return (
    <div className="dashboard" >
      <div style={{display:'flex', justifyContent:'space-between'}}>
        <h3>Your Posted Jobs</h3>
        <button className="post-job-btn" onClick={()=> navigate('/company/postjob')}> + Post New Job</button>
      </div>

      <table className="jobs-table">
        <thead><tr><th>Title</th>
        <th>Location</th>
        <th>Posted On</th>
        <th>Applications</th>
        <th>Actions</th></tr></thead>
        <tbody>
          {jobs.map(job => (
            <tr key={job.id}>
              <td>{job.title}</td>
              <td>{job.location}</td>
              <td>{new Date(job.postedAt).toLocaleString()}</td>
              <td><button onClick={()=> navigate(`/company/job/${job.id}/applicants`)}>View</button></td>
              <td>
                <button onClick={()=> navigate(`/company/job/edit/${job.id}`)}>Edit</button>
                <button onClick={()=> deleteJob(job.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
