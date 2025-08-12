import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Footer from "./components/Footer";
import Profile from "./pages/Candidate/CandidateProfile";
import RegisterRole from "./components/RegisterRole";
import RegisterCandidate from "./pages/Candidate/RegisterCandidate";


import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateCandidate from "./pages/Candidate/UpdateCandidate";
import ViewCandidate from "./pages/Candidate/ViewCandidate"

import RegisterCompany from "./pages/Company/RegisterCompany";
import CompanyList from "./pages/Company/CompanyList";
import CompanyProfile from "./pages/Company/CompanyProfile";
import UpdateCompany from "./pages/Company/UpdateCompany";
import CompanyDashboard from "./pages/Company/CompanyDashboard";
import PostJob from "./pages/Company/PostJob";
import ApplicantsList from "./pages/Company/ApplicantsList";



// Jobs
import JobList from "./pages/Job/JobList";
import JobDetails from "./pages/Job/JobDetails";


export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterRole />} />
          <Route path="/register/candidate" element={<RegisterCandidate />} />
          <Route path="/register/company" element={<RegisterCompany />} />

          <Route path="/candidate" element={<Profile />} />
          <Route path="/updatecandidate/:id" element={<UpdateCandidate />} />
           <Route path="/viewcandidate" element={<ViewCandidate />} />


        
        <Route path="/company/register" element={<RegisterCompany />} />
        <Route path="/company/all" element={<CompanyList />} />
        <Route path="/company" element={<CompanyProfile />} />
        <Route path="/company/update/:id" element={<UpdateCompany />} />
         <Route path="/company/dashboard" element={<CompanyDashboard />} />
        <Route path="/company/postjob" element={<PostJob />} />
        <Route path="/company/job/:jobId/applicants" element={<ApplicantsList />} />

       
         <Route path="/jobs" element={<JobList />} />
        <Route path="/apply/:id" element={<JobDetails />} />
    
         
        </Routes>
       
        <ToastContainer />
      </BrowserRouter>
        <Footer/>
    </AuthProvider>
    
  );
}
