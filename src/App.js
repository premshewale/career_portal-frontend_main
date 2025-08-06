import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Footer from "./components/Footer";
import Profile from "./pages/Candidate/CandidateProfile";
import RegisterRole from "./components/RegisterRole";
import RegisterCandidate from "./pages/Candidate/RegisterCandidate";

import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateCandidate from "./pages/Candidate/UpdateCandidate";

import RegisterCompany from "./pages/Company/RegisterCompany";

import CompanyList from "./pages/Company/CompanyList";
import CompanyProfile from "./pages/Company/CompanyProfile";
import UpdateCompany from "./pages/Company/UpdateCompany";


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
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/candidate" element={<Profile />} />
          <Route path="/updatecandidate/:id" element={<UpdateCandidate />} />


        
        <Route path="/company/register" element={<RegisterCompany />} />
        <Route path="/company/all" element={<CompanyList />} />
        <Route path="/company" element={<CompanyProfile />} />
        <Route path="/company/update/:id" element={<UpdateCompany />} />

       
        </Routes>
         <Footer/>
        <ToastContainer />
      </BrowserRouter>
    </AuthProvider>
  );
}
