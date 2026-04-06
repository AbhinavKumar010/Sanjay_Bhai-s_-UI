import React, { useState, useEffect } from "react";
import { socket } from "../socket/socket";
import { useNavigate } from "react-router-dom";
import DummyUsers from "./DummyUsers";

function Home() {
  const navigate = useNavigate();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [searching, setSearching] = useState(false);
  const [showDummy, setShowDummy] = useState(false);

  // ================= SOCKET =================
  useEffect(() => {
    socket.emit("get-online-users");

    socket.on("online-users", (users) => setOnlineUsers(users));

    socket.on("match-found", (partner) => {
      setSearching(false);
      navigate("/chat", { state: { partner, isCaller: true } });
    });

    return () => {
      socket.off("online-users");
      socket.off("match-found");
    };
  }, [navigate]);

  const startMatching = () => {
    setSearching(true);
    socket.emit("find-match");
    setShowDummy(true);
  };

  // ================= NEW NAVIGATION =================
  const goToProfile = () => {
    navigate("/create-profile");
  };

  const goToFeed = () => {
    navigate("/feed");
  };

  return (
    <div className="container">
      <h2>Find Someone to Chat</h2>

      {/* Existing feature */}
      <button onClick={startMatching} disabled={searching}>
        {searching ? "Searching..." : "Find Someone"}
      </button>

      {/* ✅ NEW DATING FEATURES */}
      <div style={{ marginTop: "20px" }}>
        <h3>Dating Features</h3>

        <button onClick={goToProfile} style={{ marginRight: "10px" }}>
          👤 Create Profile
        </button>

        <button onClick={goToFeed}>
          🔥 Discover People
        </button>
      </div>

      {/* Existing online users */}
      <h3>Registered Online Users</h3>
      <ul>
        {onlineUsers.map((user) => (
          <li key={user.socketId}>{user.username}</li>
        ))}
      </ul>

      {/* Existing dummy users */}
      {showDummy && <DummyUsers onClose={() => setShowDummy(false)} />}
    </div>
  );
}

export default Home;