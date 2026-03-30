// frontend/src/socket/socket.js
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // backend server URL

// Register current user after login/username
socket.emit("register", "Abhinav"); // replace with actual username

export default socket;