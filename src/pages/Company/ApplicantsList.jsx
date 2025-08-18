// ApplicantsList.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
import "../../styles/Company/applicants.css";

export default function ApplicantsList() {
  const { jobId } = useParams();
  const [apps, setApps] = useState([]);

  useEffect(() => {
    api
      .get(`/jobs/${jobId}/applicants`)
      .then((res) => setApps(res.data))
      .catch(console.error);
  }, [jobId]);

  const download = (appId, filename) => {
    api
      .get(`/jobs/applications/${appId}/resume`, { responseType: "blob" })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const a = document.createElement("a");
        a.href = url;
        a.download = filename || "resume";
        document.body.appendChild(a);
        a.click();
        a.remove();
      });
  };

  return (
    <div className="applicants-container">
      <h3>Applicants</h3>
      {apps.length === 0 && <p>No applicants yet</p>}
      {apps.map((a) => (
        <div key={a.id} className="applicant-card">
          <div className="applicant-info">
            <b>{a.candidateName}</b>
            <p>{a.candidateEmail}</p>
          </div>
          <div className="applicant-actions">
            {a.resumeFilename ? (
              <button
                onClick={() =>
                  download(a.id, a.resumeFilename || "resume")
                }
              >
                Download Resume
              </button>
            ) : (
              <span style={{ color: "#888", fontSize: "13px" }}>
                No resume uploaded
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
