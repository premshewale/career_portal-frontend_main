import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "../../styles/Candidate/profile.css"

export default function ProfilePage() {
  const { user } = useAuth(); // Candidate DTO
  const [candidate, setCandidate] = useState(null);
  const [showResume, setShowResume] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setCandidate(user);
    }
  }, [user]);

  const handleDownloadResume = () => {
    if (!candidate?.resume) return toast.error("No resume available", {
      position: 'top-center',
    });

    const byteCharacters = atob(candidate.resume);
    const byteNumbers = new Array(byteCharacters.length)
      .fill()
      .map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);

    const blob = new Blob([byteArray], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `${candidate.name}_resume.pdf`;
    link.click();
  };

  const handleViewResume = () => {
    if (!candidate?.resume) return toast.error("No resume available" , {
      position: 'top-center',
    });
    setShowResume(true);
  };

  if (!candidate) return <div className="home-card" style={{color:"red"}}>You Are Logged Out !!!   Please Login Again.... 
                          <a href="/login">Login</a></div>;

  return (
    <div className="profile-container">
      {/* Resume Modal */}
      {showResume && (
        <div className="modal-overlay" onClick={() => setShowResume(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <iframe
              src={`data:application/pdf;base64,${candidate.resume}`}
              width="100%"
              height="500px"
              title="Resume Preview"
            />
            <button className="close-btn" onClick={() => setShowResume(false)}>
              ❌ Close
            </button>
          </div>
        </div>
      )}

      <div className="profile-photo-section">
        {candidate.photo && (
          <img
            src={`data:image/jpeg;base64,${candidate.photo}`}
            alt="Candidate"
            className="profile-photo"
          />
        )}

        <div style={{ marginTop: "12px" }}>
          <button
            onClick={handleDownloadResume}
            className="download-btn"
            style={{ marginRight: "10px" }}
          >
            Download Resume
          </button>

          <button
            onClick={handleViewResume}
            className="download-btn"
            style={{ backgroundColor: "#673ab7" }}
          >
            View Resume
          </button>

          <button
            onClick={() => navigate(`/updatecandidate/${candidate.id}`)}
            className="download-btn"
            style={{ marginTop: "25px", backgroundColor: "#2196f3" }}
          >
            Update Profile
          </button>
        </div>
      </div>

      <div className="profile-info-section">
        <h2 className="profile-title">{candidate.name}</h2>
        <div className="profile-info-grid">
          <div><span className="label">Email:</span> {candidate.email}</div>
          <div><span className="label">Username:</span> {candidate.username}</div>
          <div><span className="label">Mobile:</span> {candidate.mobile}</div>
          <div><span className="label">Gender:</span> {candidate.gender}</div>
          <div><span className="label">Status:</span> {candidate.status}</div>
          <div><span className="label">Birthdate:</span> {candidate.birthdate}</div>
          <div><span className="label">Education:</span> {candidate.education}</div>
          <div><span className="label">Work Exp:</span> {candidate.workexp}</div>
          <div>
            <span className="label">Skills:</span>
            <div className="skill-list">
              {candidate.skills?.map((skill, index) => (
                <span className="skill-tag" key={index}>{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
