import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (!token) return null;

  let role = "voter";

  try {
    role = jwtDecode(token).role;
  } catch {
    localStorage.removeItem("token");
    navigate("/");
    return null;
  }

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div style={{ fontWeight: "bold", color: "white" }}>
        Voting System
      </div>

      <Link to="/dashboard">Dashboard</Link>
      <Link to="/profile">Profile</Link>

      {role === "admin" && <Link to="/admin">Admin</Link>}

      <button onClick={logout}>Logout</button>
    </nav>
  );
}
