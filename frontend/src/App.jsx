import React, { useState, useEffect } from "react";
import "./styles.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Splash from "./components/Splash";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Chat from "./pages/Chat";

// Import CRA service worker registration
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallBtn, setShowInstallBtn] = useState(false);

  // Splash screen timer (optional)
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000); // 3 sec splash
    return () => clearTimeout(timer);
  }, []);

  // Handle PWA install prompt
  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBtn(true);
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", () => {});
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    console.log("User choice:", choice.outcome);
    setDeferredPrompt(null);
    setShowInstallBtn(false);
  };

  // Register service worker for offline capability
  useEffect(() => {
    serviceWorkerRegistration.register();
  }, []);

  if (showSplash) {
    return <Splash onFinish={() => setShowSplash(false)} />;
  }

  return (
    <Router>
      <Navbar />
      
      {showInstallBtn && (
        <div style={{ textAlign: "center", margin: "10px" }}>
          <button
            onClick={handleInstallClick}
            style={{
              padding: "12px 20px",
              borderRadius: "10px",
              background: "#667eea",
              color: "white",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            Install App
          </button>
        </div>
      )}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;