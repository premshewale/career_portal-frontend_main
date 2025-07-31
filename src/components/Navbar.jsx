import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate(); // for navigation after logout

  const handleLogout = () => {
  logout(() => navigate("/"));
  };

  return (
    <nav className="navbar">
      <Link to="/">CareerPortal</Link>
      <div>
        <Link to="/jobs">Jobs</Link>
        <Link to="/companies">Companies</Link>
        {user ? (
          <>
            <Link to="/dashboard">Profile</Link>
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
