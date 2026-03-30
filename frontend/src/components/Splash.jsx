import React, { useEffect, useState } from "react";
import "../styles.css";
import logo from "../assets/logo.png";

function Splash({ onFinish }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 200);
    setTimeout(() => onFinish(), 2500);
  }, []);

  return (
    <div className="splash">
      <img
        src={logo}
        alt="logo"
        className={`logo ${animate ? "logo-show" : ""}`}
      />
    </div>
  );
}

export default Splash;