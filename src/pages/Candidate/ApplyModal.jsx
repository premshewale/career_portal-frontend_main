import React, { useState } from "react";
import api from "../../api/axios";

export default function ApplyModal({ job, onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [resume, setResume] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", name);
    form.append("email", email);
    if (resume) form.append("resume", resume);

    try {
      await api.post(`/jobs/${job.id}/apply`, form, { headers: { 'Content-Type': 'multipart/form-data' } });
      alert('Applied successfully');
      onClose();
    } catch (err) {
      console.error(err);
      alert('Apply failed');
    }
  };

  return (
    <div className="modal">
      <form onSubmit={submit}>
        <h4>Apply to {job.title}</h4>
        <input required placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} />
        <input required placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="file" accept=".pdf,.doc,.docx" onChange={e=> setResume(e.target.files[0])} />
        <button type="submit">Submit</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}
