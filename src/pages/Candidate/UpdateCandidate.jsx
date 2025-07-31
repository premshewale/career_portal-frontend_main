import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../../context/AuthContext";
import { useParams } from 'react-router-dom';
import "../../styles/Candidate/updatecandidate.css"

const UpdateCandidate = () => {
   const { user } = useAuth(); // Candidate DTO
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '', email: '', mobile: '', skills: [], education: '', workexp: '',
    photo: null, resume: null, gender: '', birthdate: ''
  });

  const [showResume, setShowResume] = useState(false);
  const [showPhoto, setShowPhoto] = useState(false);
  const [skillInput, setSkillInput] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:8080/candidate/${id}`)
      .then(res => {
        const data = res.data;
        const parsedSkills = Array.isArray(data.skills)
          ? data.skills
          : (data.skills?.split(',').map(s => s.trim()) || []);
        setFormData({ ...data, skills: parsedSkills });
      })
      .catch(console.error);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const { name, files } = e.target;
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.split(',')[1];
      setFormData(prev => ({ ...prev, [name]: base64 }));
    };
    reader.readAsDataURL(files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("candidate", new Blob([JSON.stringify(formData)], { type: "application/json" }));

    if (formData.resume) {
      const resumeBlob = base64ToBlob(formData.resume, "application/pdf");
      data.append("resume", resumeBlob, "resume.pdf");
    }

    if (formData.photo) {
      const photoBlob = base64ToBlob(formData.photo, "image/jpeg");
      data.append("photo", photoBlob, "photo.jpg");
    }

    try {
      await axios.put(`http://localhost:8080/candidate/update/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Updated successfully");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  const base64ToBlob = (base64, mime) => {
    const byteString = atob(base64);
    const byteArray = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      byteArray[i] = byteString.charCodeAt(i);
    }
    return new Blob([byteArray], { type: mime });
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      if (!formData.skills.includes(skillInput.trim())) {
        setFormData(prev => ({
          ...prev,
          skills: [...prev.skills, skillInput.trim()],
        }));
      }
      setSkillInput("");
    }
  };

  const removeSkill = (index) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  if (!user) return <div className="home-card" style={{color:"red"}}>You Are Logged Out !!!   Please Login Again.... 
                          <a href="/login">Login</a></div>;

  return (
    <div className="update-candidate">
      <h2>🧾 Update Your Profile</h2>
      <p>Please fill out the information below carefully.</p>

      <form className="update-form-candidate" onSubmit={handleSubmit}>
        <div className="section-title">👤 Personal Details</div>
        <div className="form-row">
          <div className="form-group">
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Name*" />
          </div>
          <div className="form-group">
            <input name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile*" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <select name="gender" value={formData.gender || ''} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
          <div className="form-group">
            <input type="date" name="birthdate" value={formData.birthdate || ''} onChange={handleChange} />
          </div>
        </div>

        <div className="section-title">📘 Professional Info</div>
        <div className="form-row">
          <div className="form-group">
            <input name="education" value={formData.education} onChange={handleChange} placeholder="Education" />
          </div>
          <div className="form-group">
            <input name="workexp" value={formData.workexp} onChange={handleChange} placeholder="Work Exp" />
          </div>
        </div>

        <div className="form-group">
          <label>Skills:</label>
          <div className="chip-input-wrapper">
            {Array.isArray(formData.skills) && formData.skills.map((skill, index) => (
              <div className="chip" key={index}>
                {skill}
                <button type="button" style={{background:"rgb(165, 50, 50)",width:"6px",height:"3px",}} className="chip-remove" onClick={() => removeSkill(index)}>×</button>
              </div>
            ))}
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleSkillKeyDown}
              placeholder="Type and press Enter"
              className="chip-input"
            />
          </div>
        </div>

        <div className="section-title">📎 Attachments</div>
        <div className="attachments-section">
          <div className="form-group">
            <div className="attachment-preview">
              {formData.resume && (
                <span>
                  Currently: <button type="button" className="link-btn" onClick={() => setShowResume(true)}>View Resume</button>
                </span>
              )}
            </div>
            <input type="file" name="resume" onChange={handleFileChange} />
          </div>

          <div className="form-group">
            <div className="attachment-preview">
              {formData.photo && (
                <span>
                  Currently: <button type="button" className="link-btn" onClick={() => setShowPhoto(true)}>View Photo</button>
                </span>
              )}
            </div>
            <input type="file" name="photo" onChange={handleFileChange} />
          </div>
        </div>

        <button type="submit">💾 Save Profile</button>
      </form>

      {/* Resume Modal */}
      {showResume && (
        <div className="modal-overlay" onClick={() => setShowResume(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <iframe
              src={`data:application/pdf;base64,${formData.resume}`}
              width="100%"
              height="500px"
              title="Resume Preview"
            />
            <button className="close-btn" onClick={() => setShowResume(false)}>❌ Close</button>
          </div>
        </div>
      )}

      {/* Photo Modal */}
      {showPhoto && (
        <div className="modal-overlay" onClick={() => setShowPhoto(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <img
              src={`data:image/jpeg;base64,${formData.photo}`}
              alt="Profile"
              style={{ maxWidth: '100%', maxHeight: '500px' }}
            />
            <button className="close-btn" onClick={() => setShowPhoto(false)}>❌ Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateCandidate;
