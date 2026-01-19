import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (!token) return null;

  let role = "voter";

  try {
    const decoded = jwtDecode(token);
    role = decoded.role;
  } catch (err) {
    console.error("Invalid token");
    localStorage.removeItem("token");
    navigate("/");
    return null;
  }

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav style={{ display: "flex", gap: 15, marginBottom: 20 }}>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/profile">Profile</Link>
      {role === "admin" && <Link to="/admin">Admin</Link>}
      <button onClick={logout}>Logout</button>
    </nav>
  );
}
