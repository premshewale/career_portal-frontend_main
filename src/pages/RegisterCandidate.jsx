import React, { useState } from 'react';
import axios from 'axios';
import '../styles/global.css';

const RegisterCandidate = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    mobile: '',
    status: '',
    gender: '',
    birthdate: '',
    education: '',
    workexp: '', // ✅ corrected typo here
    skills: ''
  });

  const [resume, setResume] = useState(null);
  const [photo, setPhoto] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleResumeChange = (e) => setResume(e.target.files[0]);
  const handlePhotoChange = (e) => setPhoto(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const data = new FormData();
    const dtoPayload = {
      ...formData,
      skills: formData.skills.split(',').map(skill => skill.trim())
    };

    data.append(
      'candidate',
      new Blob([JSON.stringify(dtoPayload)], { type: 'application/json' })
    );
    if (resume) data.append('resume', resume); // ✅ match backend param name
    if (photo) data.append('photo', photo);   // ✅ match backend param name

    try {
      const response = await axios.post('http://localhost:8080/candidate/register', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Candidate registered successfully!');
      console.log(response.data);
    } catch (error) {
      alert('Registration failed');
      console.error(error);
    }
  };

  return (
    <div className="form-card">
      <h2>Register as Candidate</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="username" placeholder="Username*" required onChange={handleChange} />
        <input type="email" name="email" placeholder="Email*" required onChange={handleChange} />
        <input type="password" name="password" placeholder="Password*" required onChange={handleChange} />
        <input type="password" name="confirmPassword" placeholder="Confirm Password*" required onChange={handleChange} />
        <input type="text" name="name" placeholder="Full Name*" required onChange={handleChange} />
        <input type="text" name="mobile" placeholder="Mobile Number*" required onChange={handleChange} />

        <label>Status*</label>
        <label><input type="radio" name="status" value="FRESHER" onChange={handleChange} /> Fresher</label>
        <label><input type="radio" name="status" value="EXPERIENCED" onChange={handleChange} /> Experienced</label>

        <label>Gender*</label>
        <label><input type="radio" name="gender" value="MALE" onChange={handleChange} /> Male</label>
        <label><input type="radio" name="gender" value="FEMALE" onChange={handleChange} /> Female</label>
        <label><input type="radio" name="gender" value="OTHER" onChange={handleChange} /> Other</label>

        <input type="date" name="birthdate" placeholder="Date of Birth" onChange={handleChange} />
        <textarea name="education" placeholder="Education details..." onChange={handleChange}></textarea>
        <textarea name="workexp" placeholder="Work experience..." onChange={handleChange}></textarea>
        <textarea name="skills" placeholder="Skills (comma separated)" onChange={handleChange}></textarea>

        <label>Upload Resume:</label>
        <input type="file" name="resume" accept=".pdf,.doc,.docx" onChange={handleResumeChange} />

        <label>Upload Photo:</label>
        <input type="file" name="photo" accept="image/*" onChange={handlePhotoChange} />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterCandidate;
