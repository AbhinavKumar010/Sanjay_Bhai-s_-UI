import { io } from "socket.io-client";

export const socket = io("https://sanjay-bhai-s-ux.onrender.com", {
  transports: ["polling", "websocket"],
  autoConnect: false,
  timeout: 30000, // ✅ increase timeout (VERY IMPORTANT)
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 2000,
});