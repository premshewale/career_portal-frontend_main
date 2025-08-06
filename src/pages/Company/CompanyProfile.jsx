// CompanyProfile.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../../styles/Company/company.css"; // optional: for styles

const api = axios.create({ baseURL: "http://localhost:8080" });

export default function CompanyProfile() {
  const { company } = useAuth();
  const [companyData, setCompanyData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!company?.id) {
      setCompanyData(null);
      return;
    }

    let mounted = true;
    api.get(`/company/${company.id}`)
      .then((res) => {
        if (mounted) setCompanyData(res.data);
      })
      .catch((err) => {
        console.error("Company fetch error:", err);
      });

    return () => { mounted = false; };
  }, [company?.id]);

 if (!companyData) return <div className="home-card" style={{color:"red"}}>You Are Logged Out !!!   Please Login Again.... 
                          <a href="/login">Login</a></div>;

  return (
    <div className="company-profile-container">
      <div className="company-card">
        <div className="company-card-header">
          <h2>Company Profile</h2>
          <div className="company-card-actions">
            <button className="btn-primary" onClick={() => navigate("/company/all")}>All Companies</button>
            <button className="btn-secondary" onClick={() => navigate(`/company/update/${companyData.id}`)}>Edit Profile</button>
          </div>
        </div>

        <div className="company-card-body">
          <div className="company-row">
            <div className="company-label">Company Name</div>
            <div className="company-value">{companyData.companyName || "—"}</div>
          </div>

          <div className="company-row">
            <div className="company-label">Email</div>
            <div className="company-value">{companyData.email || "—"}</div>
          </div>

          <div className="company-row">
            <div className="company-label">Phone</div>
            <div className="company-value">{companyData.companyPhone || "—"}</div>
          </div>

          <div className="company-row">
            <div className="company-label">Address</div>
            <div className="company-value">{companyData.address || "—"}</div>
          </div>

          <div className="company-row">
            <div className="company-label">Industry</div>
            <div className="company-value">{companyData.industry || "—"}</div>
          </div>
        </div>

        <div className="company-card-footer">
          <button className="btn-outline" onClick={() => navigate("/company")}>
            Go to Company Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
