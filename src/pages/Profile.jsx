import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const { user } = useAuth(); // user is the logged-in Candidate DTO
  const [candidate, setCandidate] = useState(null);

  useEffect(() => {
    if (user) {
      setCandidate(user);
    }
  }, [user]);

  const handleDownloadResume = () => {
    if (!candidate?.resume) return toast.error("No resume available");

    const byteCharacters = atob(candidate.resume);
    const byteNumbers = new Array(byteCharacters.length).fill().map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);

    const blob = new Blob([byteArray], { type: "application/pdf" }); // Assuming resume is PDF
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `${candidate.name}_resume.pdf`;
    link.click();
  };

  if (!candidate) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <div className="profile-photo-section">
        <img
          src={`data:image/jpeg;base64,${candidate.photo}`}
          alt="Candidate"
          className="profile-photo"
        />
        <button onClick={handleDownloadResume} className="download-btn">
          Download Resume
        </button>
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
