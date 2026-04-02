import React, { useState, useEffect } from "react";
import { socket } from "../socket/socket";
import { useNavigate } from "react-router-dom";
import DummyUsers from "./DummyUsers"; // ← import the new component

function Home() {
  const navigate = useNavigate();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [searching, setSearching] = useState(false);
  const [showDummy, setShowDummy] = useState(false); // ← new state

  // Fetch online users and handle matches
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

    // Show dummy users after clicking "Find Someone"
    setShowDummy(true);
  };

  return (
    <div className="container">
      <h2>Find Someone to Chat</h2>
      <button onClick={startMatching} disabled={searching}>
        {searching ? "Searching..." : "Find Someone"}
      </button>

      <h3>Registered Online Users</h3>
      <ul>
        {onlineUsers.map((user) => (
          <li key={user.socketId}>{user.username}</li>
        ))}
      </ul>

      {/* Render dummy users without touching existing functions */}
      {showDummy && <DummyUsers onClose={() => setShowDummy(false)} />}
    </div>
  );
}

export default Home;