import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_API_URL.replace("/api", "");

export const socket = io(SOCKET_URL, {
  transports: ["polling", "websocket"],
  autoConnect: true, // connect immediately
  timeout: 30000, // 30 seconds
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