// PostJob.jsx
import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/Company/postjob.css"; // optional: for styles



export default function PostJob(){
  const { company } = useAuth();
  const [job, setJob] = useState({ title:'', description:'', location:'', salary:''});
  const navigate = useNavigate();
  const { id } = useParams(); // edit id

  useEffect(()=>{
    if (id) api.get(`/jobs/company/${company.id}`).then(res => {
      const found = res.data.find(j=> j.id === +id);
      if(found) setJob(found);
    });
  },[id, company?.id]);

  const submit = (e) => {
    e.preventDefault();
    if (id) {
     api.post(`/jobs/company/${company.id}/post`, job).then(()=> navigate('/company/dashboard'));
    } else {
      api.post(`/jobs/company/${company.id}/post`, job).then(()=> navigate('/company/dashboard'));
    }
  };

  return (
    <form onSubmit={submit} style={{maxWidth:600, margin:'auto'}}>
      <h3>{id ? 'Edit Job' : 'Post a New Job'}</h3>
      <input required placeholder="Title" value={job.title} onChange={e=> setJob({...job, title: e.target.value})} />
      <textarea required placeholder="Description" value={job.description} onChange={e=> setJob({...job, description: e.target.value})} />
      <input placeholder="Location" value={job.location} onChange={e=> setJob({...job, location: e.target.value})} />
      <input placeholder="Salary" value={job.salary} onChange={e=> setJob({...job, salary: e.target.value})} />
      <button type="submit">Post Job</button>
    </form>
  );
}
