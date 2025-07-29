import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateCandidate = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    skills: '',
    education: '',
    workexp: '',
  });

  useEffect(() => {
    axios.get(`http://localhost:8080/candidate/${id}`)
      .then(res => {
        setFormData(res.data);
      }).catch(console.error);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/candidate/update/${id}`, formData);
      alert('Updated successfully');
    } catch (err) {
      alert('Update failed');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      <input name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile" />
      <textarea name="education" value={formData.education} onChange={handleChange} placeholder="Education" />
      <textarea name="workexp" value={formData.workexp} onChange={handleChange} placeholder="Work Exp" />
      <textarea name="skills" value={formData.skills} onChange={handleChange} placeholder="Skills" />
      <button type="submit">Update</button>
    </form>
  );
};

export default UpdateCandidate;
