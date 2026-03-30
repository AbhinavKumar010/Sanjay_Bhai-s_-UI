import { io } from "socket.io-client";

const socket = io("https://sanjay-bhai-s-ux.onrender.com", {
  transports: ["polling", "websocket"], // ✅ IMPORTANT
  withCredentials: true,
});

export default socket;