// src/pages/Candidate/ViewCandidates.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from "../../context/AuthContext";
import "../../styles/Candidate/viewcandidate.css";

const ViewCandidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [search, setSearch] = useState("");
  const { company } = useAuth();

  useEffect(() => {
    if (company?.id) {
      axios.get("http://localhost:8080/candidate/all")
        .then(res => setCandidates(res.data))
        .catch(err => console.error('Error fetching candidates:', err));
    }
  }, [company]);

  if (!company) {
    return (
       <div className="home-card" style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Access Denied</h2>
        <p>You must be logged in as a company to view this page.</p>
        <a href="/login">Login</a>
      </div>
    );
  } 

  // Filter candidates based on search text
  const filteredCandidates = candidates.filter(c =>
    c.name?.toLowerCase().includes(search.toLowerCase()) ||
    c.skills?.join(", ").toLowerCase().includes(search.toLowerCase()) ||
    c.education?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="view-candidates-container">
      <h2>All Candidates in System</h2>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by name, skill, or education..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      {filteredCandidates.length > 0 ? (
        filteredCandidates.map(c => (
          <div key={c.id} className="candidate-card">
            <h3>{c.name}</h3>
            <p><strong>Email:</strong> {c.email}</p>
            <p><strong>Mobile:</strong> {c.mobile}</p>
            <p><strong>Gender:</strong> {c.gender}</p>
            <p><strong>Status:</strong> {c.status}</p>
            <p><strong>Skills:</strong> {c.skills?.join(', ')}</p>
            <p><strong>Education:</strong> {c.education}</p>
            <p><strong>Experience:</strong> {c.workexp}</p>
            {c.photo && (
              <img
                src={`data:image/jpeg;base64,${c.photo}`}
                alt="Candidate"
                className="candidate-photo"
              />
            )}
          </div>
        ))
      ) : (
        <p>No candidates found.</p>
      )}
    </div>
  );
};

export default ViewCandidates;
