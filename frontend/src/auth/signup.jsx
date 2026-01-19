import { useState } from "react";
import { signup } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    aadharCardNumber: "",
    password: "",
    age: "",
    address: "",
    role: "voter",
  });

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await signup(form);
      console.log(res.data);
      alert("Signup successful");
      navigate("/");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <form onSubmit={submit}>
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
   <input
  placeholder="Aadhar Number (12 digits)"
  value={form.aadharCardNumber}
  onChange={(e) =>
    setForm({ ...form, aadharCardNumber: Number(e.target.value) })
  }
  required
/>



      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />
    <input
  type="number"
  placeholder="Age"
  value={form.age}
  onChange={(e) => setForm({ ...form, age: Number(e.target.value) })}
  required
/>
      <input
        type="text"
        placeholder="Address"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
        required
      />
      <button type="submit">Signup</button>
    </form>
  );
}
