import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewCandidates = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/candidate/all')
      .then(res => setCandidates(res.data))
      .catch(err => console.error('Error fetching candidates:', err));
  }, []);

  return (
    <div>
      <h2>All Candidates</h2>
      {candidates.map(c => (
        <div key={c.id} style={{ border: '1px solid #ccc', padding: '15px', margin: '10px' }}>
          <h3>{c.name}</h3>
          <p><strong>Email:</strong> {c.email}</p>
          <p><strong>Mobile:</strong> {c.mobile}</p>
          <p><strong>Gender:</strong> {c.gender}</p>
          <p><strong>Status:</strong> {c.status}</p>
          <p><strong>Skills:</strong> {c.skills.join(', ')}</p>
          <p><strong>Education:</strong> {c.education}</p>
          <p><strong>Experience:</strong> {c.workexp}</p>
          {c.photo && (
            <img
              src={`data:image/jpeg;base64,${c.photo}`}
              alt="Candidate"
              style={{ width: '120px', borderRadius: '10px', marginTop: '10px' }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ViewCandidates;
