import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
 // optional if you style it

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      alert("Login successful");
      navigate("/home");
    } catch (err) {
      alert("Login failed");
      console.error(err);
    }
  };

  return (
    <div className="container">
      {/* 🔙 Back Button */}
      <button className="back-btn"  onClick={() => navigate("/")}>
        ← Register
      </button>

      <h2>Login</h2>

      <input
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

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;