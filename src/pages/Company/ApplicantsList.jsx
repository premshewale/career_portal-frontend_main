// ApplicantsList.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
export default function ApplicantsList(){
  const { jobId } = useParams();
  const [apps, setApps] = useState([]);

  useEffect(()=> {
    api.get(`/jobs/${jobId}/applicants`).then(res => setApps(res.data)).catch(console.error);
  },[jobId]);

  const download = (appId, filename) => {
    api.get(`/jobs/applications/${appId}/resume`, { responseType: 'blob' })
       .then(res => {
         const url = window.URL.createObjectURL(new Blob([res.data]));
         const a = document.createElement('a');
         a.href = url;
         a.download = filename || 'resume';
         document.body.appendChild(a);
         a.click();
         a.remove();
       });
  };

  return (
    <div>
      <h3>Applicants</h3>
      {apps.length === 0 && <p>No applicants yet</p>}
      {apps.map(a => (
        <div key={a.id} className="card">
          <p><b>{a.candidateName}</b></p>
          <p>{a.candidateEmail}</p>
          <button onClick={()=> download(a.id, a.resumeFilename || 'resume')}>Download Resume</button>
        </div>
      ))}
    </div>
  );
}
