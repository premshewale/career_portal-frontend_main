// src/pages/Company/CompanyList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext"; // adjust path if needed
import "../../styles/Company/companylist.css"; // optional: for styles
export default function CompanyList() {
  const { user } = useAuth();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      axios
        .get("http://localhost:8080/company/all")
        .then((res) => setCompanies(res.data))
        .catch((err) => console.error("Error fetching companies:", err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user]);

if (!user) {
    return (
      <div className="home-card" style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Access Denied</h2>
        <p>You must be logged in as a candidate to view this page.</p>
        <a href="/login">Login</a>
      </div>
    );
  }

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading companies...</p>;
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Company List</h1>
      {companies.length === 0 ? (
        <p style={{ textAlign: "center" }}>No companies found.</p>
      ) : (
        <table style={{ width: "80%", margin: "auto", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Industry</th>
              <th>Headquarters</th>
              <th>Company Size</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((c) => (
              <tr key={c.id}>
                <td>{c.companyName}</td>
                <td>{c.industry}</td>
                <td>{c.headquarters}</td>
                <td>{c.companySize}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
