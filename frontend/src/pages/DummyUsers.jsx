import React, { useState } from "react";
import { FaHeart, FaComment } from "react-icons/fa";
import ChatBox from "./AppChatBox"; // ✅ Successfully imports the ChatBox component

function DummyUsers({ onClose }) {
  const [likedUsers, setLikedUsers] = useState([]);
  const [activeChat, setActiveChat] = useState(null); // ✅ Controls the chatbox state

  // 🔥 Updated: Mostly female + proper names + better feel
  const dummyUsers = [
    { id: 1, username: "Ananya", gender: "female", avatar: "https://randomuser.me/api/portraits/women/65.jpg", age: 22, city: "Delhi" },
    { id: 2, username: "Diya", gender: "female", avatar: "https://randomuser.me/api/portraits/women/44.jpg", age: 21, city: "Mumbai" },
    { id: 3, username: "Kavya", gender: "female", avatar: "https://randomuser.me/api/portraits/women/47.jpg", age: 23, city: "Bangalore" },
    { id: 4, username: "Ira", gender: "female", avatar: "https://randomuser.me/api/portraits/women/22.jpg", age: 24, city: "Pune" },
    { id: 5, username: "Myra", gender: "female", avatar: "https://randomuser.me/api/portraits/women/10.jpg", age: 22, city: "Goa" },
    { id: 6, username: "Sara", gender: "female", avatar: "https://randomuser.me/api/portraits/women/55.jpg", age: 23, city: "Delhi" },
    { id: 7, username: "Anika", gender: "female", avatar: "https://randomuser.me/api/portraits/women/60.jpg", age: 21, city: "Mumbai" },
    { id: 8, username: "Riya", gender: "female", avatar: "https://randomuser.me/api/portraits/women/19.jpg", age: 24, city: "Jaipur" },
    { id: 9, username: "Saanvi", gender: "female", avatar: "https://randomuser.me/api/portraits/women/21.jpg", age: 22, city: "Indore" },
    { id: 10, username: "Priya", gender: "female", avatar: "https://randomuser.me/api/portraits/women/24.jpg", age: 23, city: "Delhi" },
    { id: 11, username: "Neha", gender: "female", avatar: "https://randomuser.me/api/portraits/women/26.jpg", age: 21, city: "Mumbai" },
    { id: 12, username: "Simran", gender: "female", avatar: "https://randomuser.me/api/portraits/women/28.jpg", age: 22, city: "Chandigarh" },
    { id: 13, username: "Pooja", gender: "female", avatar: "https://randomuser.me/api/portraits/women/30.jpg", age: 24, city: "Delhi" },
    { id: 14, username: "Aisha", gender: "female", avatar: "https://randomuser.me/api/portraits/women/31.jpg", age: 23, city: "Hyderabad" },
    { id: 15, username: "Naina", gender: "female", avatar: "https://randomuser.me/api/portraits/women/32.jpg", age: 22, city: "Mumbai" },
    { id: 16, username: "Sneha", gender: "female", avatar: "https://randomuser.me/api/portraits/women/33.jpg", age: 21, city: "Pune" },
    { id: 17, username: "Tanya", gender: "female", avatar: "https://randomuser.me/api/portraits/women/34.jpg", age: 24, city: "Delhi" },
    { id: 18, username: "Megha", gender: "female", avatar: "https://randomuser.me/api/portraits/women/35.jpg", age: 23, city: "Bangalore" },
    { id: 19, username: "Ishita", gender: "female", avatar: "https://randomuser.me/api/portraits/women/36.jpg", age: 22, city: "Kolkata" },
    { id: 20, username: "Ritika", gender: "female", avatar: "https://randomuser.me/api/portraits/women/37.jpg", age: 21, city: "Delhi" },
    // 👨 Few male users
    { id: 21, username: "Aarav", gender: "male", avatar: "https://randomuser.me/api/portraits/men/32.jpg", age: 25, city: "Delhi" },
    { id: 22, username: "Vivaan", gender: "male", avatar: "https://randomuser.me/api/portraits/men/33.jpg", age: 26, city: "Mumbai" },
    { id: 23, username: "Aditya", gender: "male", avatar: "https://randomuser.me/api/portraits/men/34.jpg", age: 24, city: "Pune" },
    { id: 24, username: "Arjun", gender: "male", avatar: "https://randomuser.me/api/portraits/men/35.jpg", age: 27, city: "Delhi" },
    { id: 25, username: "Kabir", gender: "male", avatar: "https://randomuser.me/api/portraits/men/36.jpg", age: 25, city: "Jaipur" },
    { id: 26, username: "Aryan", gender: "male", avatar: "https://randomuser.me/api/portraits/men/37.jpg", age: 26, city: "Indore" },
  ];

  // ❤️ Like Handler
  const handleLike = (user) => {
    if (!likedUsers.includes(user.id)) {
      setLikedUsers([...likedUsers, user.id]);
      // Optional: Remove the alert if you want it to feel more modern
      // alert(`You liked ${user.username}!`); 
    }
  };

  return (
    <div style={{ padding: "40px 20px", textAlign: "center", fontFamily: "sans-serif", background: "#f8f9fa", minHeight: "100vh" }}>
      <h2 style={{ marginBottom: "20px", color: "#333" }}>Available Users</h2>

      {onClose && (
        <button
          onClick={onClose}
          style={{
            padding: "10px 20px", marginBottom: "30px", cursor: "pointer", borderRadius: "20px",
            background: "#495057", color: "#fff", border: "none", fontWeight: "bold", boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
          }}
        >
          Close
        </button>
      )}

      {/* Users Grid */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "25px", justifyContent: "center", maxWidth: "1200px", margin: "0 auto" }}>
        {dummyUsers.map((user) => (
          <div
            key={user.id}
            style={{
              background: "#fff", border: "1px solid #e9ecef", borderRadius: "16px", padding: "25px 20px",
              width: "220px", textAlign: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", transition: "transform 0.2s ease"
            }}
          >
            <img
              src={user.avatar}
              alt={user.username}
              style={{
                width: "120px", height: "120px", borderRadius: "50%", objectFit: "cover",
                marginBottom: "15px", border: "4px solid #f1f3f5", boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
              }}
            />

            <div style={{ fontWeight: "bold", fontSize: "18px", color: "#212529", marginBottom: "4px" }}>
              {user.username}
            </div>

            <div style={{ fontSize: "14px", color: "#6c757d" }}>
              {user.age} • {user.city}
            </div>

            <div style={{ display: "flex", justifyContent: "space-evenly", marginTop: "20px", paddingTop: "15px", borderTop: "1px solid #f1f3f5" }}>
              {/* ❤️ Like Button */}
              <button
                onClick={() => handleLike(user)}
                style={{
                  background: "none", border: "none", cursor: "pointer", transition: "transform 0.1s",
                  color: likedUsers.includes(user.id) ? "#ff4757" : "#ced4da",
                }}
              >
                <FaHeart size={26} />
              </button>

              {/* 💬 Chat Button */}
              <button
                onClick={() => setActiveChat(user)}
                style={{
                  background: "none", border: "none", cursor: "pointer", transition: "transform 0.1s",
                  color: "#1e90ff",
                }}
              >
                <FaComment size={26} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ ChatBox Integration */}
      {activeChat && (
        <ChatBox
          user={activeChat}
          onClose={() => setActiveChat(null)}
        />
      )}
    </div>
  );
}

export default DummyUsers;