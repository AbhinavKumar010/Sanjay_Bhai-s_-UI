import React, { useState, useEffect } from "react";
import "./styles.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Splash from "./components/Splash";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Chat from "./pages/Chat";

import { io } from "socket.io-client";

// ✅ FIXED SOCKET CONFIG
export const socket = io("https://sanjay-bhai-s-ux.onrender.com", {
  transports: ["polling", "websocket"], // ✅ IMPORTANT
  autoConnect: false, // ✅ control connection manually
});

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallBtn, setShowInstallBtn] = useState(false);

  // 🔥 SOCKET CONNECTION
  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("✅ Connected:", socket.id);

      // register user after connection
      socket.emit("register", "Abhinav"); // later replace with dynamic username
    });

    socket.on("connect_error", (err) => {
      console.log("❌ Socket error:", err.message);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Splash screen timer
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Handle PWA install prompt
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBtn(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () =>
      window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;

    console.log("User choice:", choice.outcome);

    setDeferredPrompt(null);
    setShowInstallBtn(false);
  };

  // Service worker register (PWA)
  useEffect(() => {
    if (import.meta.env.PROD && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log("✅ SW registered:", registration);
        })
        .catch((err) => {
          console.error("❌ SW failed:", err);
        });
    }
  }, []);

  if (showSplash) {
    return <Splash onFinish={() => setShowSplash(false)} />;
  }

  return (
    <Router>
      <Navbar />

      {/* Install Button */}
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

      {/* Routes */}
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