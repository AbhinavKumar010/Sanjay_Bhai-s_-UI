import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Landingpage.css";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      {/* Floating hearts */}
      {[...Array(0)].map((_, i) => (
        <div key={i} className={`heart heart${i + 1}`}>❤️</div>
      ))}

      <div className="landing-content">
        <h1>Connect & Chat</h1>
        <p>Meet new people around the world instantly.</p>

        <div className="buttons">
          <button onClick={() => navigate("/login")} className="btn login-btn">
            Login
          </button>
          <button onClick={() => navigate("/register")} className="btn register-btn">
            Register
          </button>
        </div>

        <div className="features">
          <div className="feature">
            <span>💬</span>
            <p>Instant Chat</p>
          </div>
          <div className="feature">
            <span>🌐</span>
            <p>Global Connections</p>
          </div>
          <div className="feature">
            <span>🔒</span>
            <p>Safe & Private</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;