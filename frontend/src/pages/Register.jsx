import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState(""); // New field
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!gender) {
      alert("Please select your gender");
      return;
    }

    try {
      const res = await API.post("/auth/register", {
        username,
        email,
        password,
        gender,
      });
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

      <div>
        <label>
          <input
            type="radio"
            name="gender"
            value="male"
            onChange={(e) => setGender(e.target.value)}
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="female"
            onChange={(e) => setGender(e.target.value)}
          />
          Female
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="other"
            onChange={(e) => setGender(e.target.value)}
          />
          Other
        </label>
      </div>

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;