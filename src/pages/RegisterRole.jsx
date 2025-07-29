import { Link } from "react-router-dom";

export default function RegisterRole() {
  return (
    <div className="home-card">
      <h2>Choose Your Role</h2>
      <Link to="/register/candidate">Register as Candidate</Link>
      <Link to="/register/company">Register as Company</Link>
    </div>
  );
}
