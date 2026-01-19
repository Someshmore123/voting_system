import { useEffect, useState } from "react";
import { getProfile, changePassword } from "../api/api";

export default function Profile() {
  const [user, setUser] = useState({});
  const [password, setPassword] = useState("");

  useEffect(() => {
    getProfile().then(res => setUser(res.data));
  }, []);

  const update = async () => {
    await changePassword({ password });
    alert("Password updated");
  };

  return (
    <div>
      <h2>Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>

      <input type="password" placeholder="New password" onChange={e => setPassword(e.target.value)} />
      <button onClick={update}>Change Password</button>
    </div>
  );
}
