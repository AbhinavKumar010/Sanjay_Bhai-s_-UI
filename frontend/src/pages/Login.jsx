import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      alert("Login successful");
      navigate("/home");
    } catch (err) {
      alert("Login failed");
    }
  };

return (
  <div className="container">
    <h2>Login</h2>

    <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

    <button onClick={handleLogin}>Login</button>
  </div>
);
}

export default Login;