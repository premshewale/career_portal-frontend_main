import React, { useState } from "react";
import axios from "../../api/axios";
import "../../styles/Company/registercompany.css";
import { useNavigate } from "react-router-dom";

const RegisterCompany = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    industry: "",
    companySize: "",
    headquarters: "",
    companyType: "",
    founded: "",
    specialties: "",
    address: "",
    companyPhone: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await axios.post("/company/register", formData);
       alert("Registered successfully");
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="register-container">
      <h2>Register as Company</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} required />
        <input name="email" placeholder="Email" type="email" onChange={handleChange} required />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} required />
        <input name="confirmPassword" placeholder="Confirm Password" type="password" onChange={handleChange} required />
        <input name="companyName" placeholder="Company Name" onChange={handleChange} required />
        <input name="industry" placeholder="Industry" onChange={handleChange} />
        <input name="companySize" placeholder="Company Size" onChange={handleChange} />
        <input name="headquarters" placeholder="Headquarters" onChange={handleChange} />
        <input name="companyType" placeholder="Company Type" onChange={handleChange} />
        <input name="founded" placeholder="Founded" onChange={handleChange} />
        <textarea name="specialties" placeholder="Specialties" onChange={handleChange}></textarea>
        <textarea name="address" placeholder="Address" onChange={handleChange}></textarea>
        <input name="companyPhone" placeholder="Phone" onChange={handleChanggite} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterCompany;
