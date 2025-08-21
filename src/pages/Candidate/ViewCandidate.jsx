// src/pages/Candidate/ViewCandidates.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import "../../styles/Candidate/viewcandidate.css";

const ViewCandidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [filters, setFilters] = useState({
    gender: "All",
    education: "",
    skill: "",
    workexp: "",
    createdAfter: "",
    search: "",
  });
  const [modalContent, setModalContent] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const candidatesPerPage = 10;

  const { company } = useAuth();

  useEffect(() => {
    if (company?.id) {
      axios
        .get("http://localhost:8080/candidate/all")
        .then((res) => setCandidates(res.data))
        .catch((err) => console.error("Error fetching candidates:", err));
    }
  }, [company]);

  if (!company) {
    return (
      <div
        className="home-card"
        style={{ textAlign: "center", marginTop: "50px" }}
      >
        <h2>Access Denied</h2>
        <p>You must be logged in as a company to view this page.</p>
        <a href="/login">Login</a>
      </div>
    );
  }

  // Apply filters
  const filteredCandidates = candidates.filter((c) => {
    const matchesSearch =
      c.name?.toLowerCase().includes(filters.search.toLowerCase()) ||
      c.skills?.join(", ").toLowerCase().includes(filters.search.toLowerCase()) ||
      c.education?.toLowerCase().includes(filters.search.toLowerCase());

    const matchesGender =
      filters.gender === "All" ||
      c.gender?.toUpperCase() === filters.gender.toUpperCase();

    const matchesEducation =
      !filters.education ||
      c.education?.toLowerCase().includes(filters.education.toLowerCase());

    const matchesSkill =
      !filters.skill ||
      c.skills?.some((s) => s.toLowerCase().includes(filters.skill.toLowerCase()));

    const matchesWorkExp =
      !filters.workexp ||
      c.workexp?.toLowerCase().includes(filters.workexp.toLowerCase());

    const matchesCreated =
      !filters.createdAfter ||
      new Date(c.createdAt) >= new Date(filters.createdAfter);

    return (
      matchesSearch &&
      matchesGender &&
      matchesEducation &&
      matchesSkill &&
      matchesWorkExp &&
      matchesCreated
    );
  });

  // Pagination logic
  const indexOfLastCandidate = currentPage * candidatesPerPage;
  const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;
  const currentCandidates = filteredCandidates.slice(
    indexOfFirstCandidate,
    indexOfLastCandidate
  );
  const totalPages = Math.ceil(filteredCandidates.length / candidatesPerPage);

  return (
    <div className="view-candidates-container">
      <h2 className="title">Candidate Report</h2>

      {/* Filter Row */}
      <div className="filters-row">
        <select
          value={filters.gender}
          onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
        >
          <option value="All">Gender: All</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="OTHER">Other</option>
        </select>

        <input
          type="text"
          placeholder="Education"
          value={filters.education}
          onChange={(e) => setFilters({ ...filters, education: e.target.value })}
        />

        <input
          type="text"
          placeholder="Skill"
          value={filters.skill}
          onChange={(e) => setFilters({ ...filters, skill: e.target.value })}
        />

        <input
          type="text"
          placeholder="Work Exp"
          value={filters.workexp}
          onChange={(e) => setFilters({ ...filters, workexp: e.target.value })}
        />

        <input
          type="date"
          value={filters.createdAfter}
          onChange={(e) =>
            setFilters({ ...filters, createdAfter: e.target.value })
          }
        />

        <button className="search-btn">🔍 Search</button>
        <button className="export-btn">⬇ Export Excel</button>
      </div>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by name, skill, or education..."
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        className="search-input"
      />

      {/* Candidate Table */}
      {currentCandidates.length > 0 ? (
        <>
          <table className="candidate-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Gender</th>
                <th>Education</th>
                <th>Work Exp</th>
                <th>Skills</th>
                <th>Status</th>
                <th>Resume</th>
                <th>Photo</th>
              </tr>
            </thead>
            <tbody>
              {currentCandidates.map((c) => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.mobile}</td>
                  <td>{c.gender}</td>
                  <td>{c.education}</td>
                  <td>{c.workexp}</td>
                  <td>{c.skills?.join(", ")}</td>
                  <td>{c.status}</td>
                  <td>
                    {c.resume ? (
                      <button
                        className="view-btn"
                        onClick={() =>
                          setModalContent({ type: "resume", data: c.resume })
                        }
                      >
                        View Resume
                      </button>
                    ) : (
                      "No Resume"
                    )}
                  </td>
                  <td>
                    {c.photo ? (
                      <button
                        className="view-btn"
                        onClick={() =>
                          setModalContent({ type: "photo", data: c.photo })
                        }
                      >
                        View Photo
                      </button>
                    ) : (
                      "No Photo"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`page-btn ${
                  currentPage === i + 1 ? "active" : ""
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      ) : (
        <p>No candidates found.</p>
      )}

      {/* Modal for Resume/Photo */}
      {modalContent && (
        <div className="modal-overlay" onClick={() => setModalContent(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-btn"
              onClick={() => setModalContent(null)}
            >
              ✖
            </button>

            {modalContent.type === "resume" ? (
              <iframe
                src={`data:application/pdf;base64,${modalContent.data}`}
                title="Resume"
                className="resume-frame"
              ></iframe>
            ) : (
              <img
                src={`data:image/jpeg;base64,${modalContent.data}`}
                alt="Candidate"
                className="candidate-photo-large"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewCandidates;
