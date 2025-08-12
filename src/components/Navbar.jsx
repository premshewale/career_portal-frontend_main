import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, company, logout } = useAuth(); // ✅ include company
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();               // ✅ unified logout
    localStorage.clear();   // optional
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/">CareerPortal</Link>
      <div> 
        <Link to="/">Home</Link>
        <Link to="/jobs">Jobs</Link>
        <Link to="/company/all">Companies</Link>
       
        <Link to="/viewcandidate">Report</Link>

        {user || company ? (
          <>
            <Link to={user ? "/candidate" : "/company"}>Profile</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
