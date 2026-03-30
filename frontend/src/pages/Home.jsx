import React, { useState, useEffect } from "react";
import {socket} from "../socket/socket";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    socket.on("online-users", (users) => {
      setOnlineUsers(users);
    });
    return () => socket.off("online-users");
  }, []);

  const startMatching = (user) => {
    socket.emit("find-match");

    socket.on("match-found", (partner) => {
      navigate("/chat", { state: { partner } });
    });
  };

  return (
    <div className="container">
      <h2>Find Someone</h2>
      <button onClick={startMatching}>Find Someone</button>

      <h3>Online Users</h3>
      <ul>
        {onlineUsers.map((user) => (
          <li key={user.socketId}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;