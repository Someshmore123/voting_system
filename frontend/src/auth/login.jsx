import { useState } from "react";
import { login } from "../api/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({
    aadharCardNumber: "",
    password: "",
  });

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      localStorage.setItem("token", res.data.token);
      alert("Login successful");
      navigate("/dashboard");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Login</h2>

      <input
        type="text"
        placeholder="Aadhar Number (12 digits)"
        value={form.aadharCardNumber}
        onChange={(e) =>
          setForm({ ...form, aadharCardNumber: e.target.value })
        }
        pattern="\d{12}"
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
        required
      />

      <button type="submit">Login</button>

      <p>
        No account? <Link to="/signup">Signup</Link>
      </p>
    </form>
  );
}
