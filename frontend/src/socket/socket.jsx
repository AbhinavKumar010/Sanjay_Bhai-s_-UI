import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_API_URL.replace("/api", "");

export const socket = io(SOCKET_URL, {
  transports: ["websocket"], // force websocket
  autoConnect: true,
  timeout: 30000,
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 2000,
});

socket.on("connect", () => {
  console.log("✅ Socket connected:", socket.id);
});

socket.on("connect_error", (err) => {
  console.error("❌ Socket connection error:", err.message);
});