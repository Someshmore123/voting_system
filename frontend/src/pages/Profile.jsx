import { useEffect, useState } from "react";
import { getProfile, changePassword } from "../api/api";

export default function Profile() {
  const [user, setUser] = useState({});
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProfile()
      .then((res) => setUser(res.data.user))
      .catch(() => alert("Failed to load profile"));
  }, []);

  const update = async () => {
    if (!currentPassword || !newPassword) {
      alert("Fill all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await changePassword({ currentPassword, newPassword });
      alert(res.data.message);
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      alert(err.response?.data?.error || "Password update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Profile</h2>
      <p>Name: {user.name}</p>

      <input
        type="password"
        placeholder="Current Password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
      />

      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <button onClick={update} disabled={loading}>
        {loading ? "Updating..." : "Change Password"}
      </button>
    </div>
  );
}
