import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");   // renamed username → name
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    // Basic validation
    if (!name || !email || !password || !gender) {
      alert("Please fill in all fields!");
      return;
    }

    try {
      const res = await API.post("/auth/register", {
        name,      // matches backend expected field
        email,
        password,
        gender,
      });

      alert("✅ Registration successful!");
      navigate("/login");
    } catch (err) {
      // Show backend error message if available
      console.error(err.response?.data);
      alert(err.response?.data?.message || "❌ Registration failed");
    }
  };

  return (
    <div className="container">
        <button className="back-btn"  onClick={() => navigate("/")}>
        ← Login
      </button>
      <h2>Register</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="gender-options">
  <label className="gender-label">
    <input
      type="radio"
      name="gender"
      value="male"
      checked={gender === "male"}
      onChange={(e) => setGender(e.target.value)}
    />
    <span>Male</span>
  </label>

  <label className="gender-label">
    <input
      type="radio"
      name="gender"
      value="female"
      checked={gender === "female"}
      onChange={(e) => setGender(e.target.value)}
    />
    <span>Female</span>
  </label>

  <label className="gender-label">
    <input
      type="radio"
      name="gender"
      value="other"
      checked={gender === "other"}
      onChange={(e) => setGender(e.target.value)}
    />
    <span>Other</span>
  </label>
</div>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;