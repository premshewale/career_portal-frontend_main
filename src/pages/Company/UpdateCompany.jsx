import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/Company/updatecompany.css";

const api = axios.create({ baseURL: "http://localhost:8080" });

export default function UpdateCompany() {
  const { company } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);

  const cid = id || company?.id;
  useEffect(() => {
    if (cid) api.get(`/company/${cid}`).then(res => setForm(res.data)).catch(console.error);
  }, [cid]);

  if (!cid)
    return (
      <div className="home-card">
        You Are Logged Out !!! Please Login Again....
        <div><a href="/login">Login</a></div>
      </div>
    );

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put(`/company/update/${cid}`, form);
      alert("Updated successfully");
      navigate("/company");
    } catch (err) {
      alert(err.response?.data || "Update failed");
    } finally {
      setSaving(false);
    }
  };
   if (!company) return <div className="home-card" style={{color:"red"}}>You Are Logged Out !!!   Please Login Again.... 
                          <a href="/login">Login</a></div>;

  return (
    <div className="update-company-container">
      <div className="update-card">
        <h2>Edit Company Profile</h2>
        <form className="update-form" onSubmit={handleSubmit}>
          <div className="two-col">
            <input name="companyName" value={form.companyName || ""} onChange={handleChange} placeholder="Company name" />
            <input name="industry" value={form.industry || ""} onChange={handleChange} placeholder="Industry" />
          </div>
          <div className="two-col">
            <input name="companySize" value={form.companySize || ""} onChange={handleChange} placeholder="Company size" />
            <input name="headquarters" value={form.headquarters || ""} onChange={handleChange} placeholder="Headquarters" />
          </div>
          <div className="two-col">
            <input name="companyType" value={form.companyType || ""} onChange={handleChange} placeholder="Company type" />
            <input name="founded" value={form.founded || ""} onChange={handleChange} placeholder="Founded" />
          </div>
          <textarea name="specialties" value={form.specialties || ""} onChange={handleChange} placeholder="Specialties" rows="3" />
          <textarea name="address" value={form.address || ""} onChange={handleChange} placeholder="Address" rows="3" />
          <div className="two-col">
            <input name="companyPhone" value={form.companyPhone || ""} onChange={handleChange} placeholder="Company phone" />
            <input name="email" value={form.email || ""} onChange={handleChange} placeholder="Email" />
          </div>
          <div className="form-actions">
            <button type="button" className="btn-outline" onClick={() => navigate(-1)}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={saving}>{saving ? "Saving..." : "Save Changes"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
