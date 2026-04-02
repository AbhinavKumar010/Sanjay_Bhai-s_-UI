import React, { useState } from "react";
import { FaHeart, FaComment } from "react-icons/fa";

function DummyUsers({ onClose }) {
  const [likedUsers, setLikedUsers] = useState([]);

  // 26 dummy users with larger female avatars
  const dummyUsers = [
    { id: 1, username: "Alice", gender: "female", avatar: "https://randomuser.me/api/portraits/women/65.jpg" },
    { id: 2, username: "Bob", gender: "male", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
    { id: 3, username: "Clara", gender: "female", avatar: "https://randomuser.me/api/portraits/women/47.jpg" },
    { id: 4, username: "David", gender: "male", avatar: "https://randomuser.me/api/portraits/men/77.jpg" },
    { id: 5, username: "Eva", gender: "female", avatar: "https://randomuser.me/api/portraits/women/22.jpg" },
    { id: 6, username: "Frank", gender: "male", avatar: "https://randomuser.me/api/portraits/men/15.jpg" },
    { id: 7, username: "Grace", gender: "female", avatar: "https://randomuser.me/api/portraits/women/10.jpg" },
    { id: 8, username: "Henry", gender: "male", avatar: "https://randomuser.me/api/portraits/men/11.jpg" },
    { id: 9, username: "Isla", gender: "female", avatar: "https://randomuser.me/api/portraits/women/55.jpg" },
    { id: 10, username: "Jack", gender: "male", avatar: "https://randomuser.me/api/portraits/men/13.jpg" },
    { id: 11, username: "Karen", gender: "female", avatar: "https://randomuser.me/api/portraits/women/14.jpg" },
    { id: 12, username: "Leo", gender: "male", avatar: "https://randomuser.me/api/portraits/men/16.jpg" },
    { id: 13, username: "Mia", gender: "female", avatar: "https://randomuser.me/api/portraits/women/60.jpg" },
    { id: 14, username: "Nathan", gender: "male", avatar: "https://randomuser.me/api/portraits/men/18.jpg" },
    { id: 15, username: "Olivia", gender: "female", avatar: "https://randomuser.me/api/portraits/women/19.jpg" },
    { id: 16, username: "Paul", gender: "male", avatar: "https://randomuser.me/api/portraits/men/20.jpg" },
    { id: 17, username: "Quinn", gender: "female", avatar: "https://randomuser.me/api/portraits/women/21.jpg" },
    { id: 18, username: "Ryan", gender: "male", avatar: "https://randomuser.me/api/portraits/men/23.jpg" },
    { id: 19, username: "Sophia", gender: "female", avatar: "https://randomuser.me/api/portraits/women/24.jpg" },
    { id: 20, username: "Tom", gender: "male", avatar: "https://randomuser.me/api/portraits/men/25.jpg" },
    { id: 21, username: "Uma", gender: "female", avatar: "https://randomuser.me/api/portraits/women/26.jpg" },
    { id: 22, username: "Victor", gender: "male", avatar: "https://randomuser.me/api/portraits/men/27.jpg" },
    { id: 23, username: "Wendy", gender: "female", avatar: "https://randomuser.me/api/portraits/women/28.jpg" },
    { id: 24, username: "Xander", gender: "male", avatar: "https://randomuser.me/api/portraits/men/29.jpg" },
    { id: 25, username: "Yara", gender: "female", avatar: "https://randomuser.me/api/portraits/women/30.jpg" },
    { id: 26, username: "Zane", gender: "male", avatar: "https://randomuser.me/api/portraits/men/31.jpg" },
  ];

  const handleLike = (user) => {
    if (!likedUsers.includes(user.id)) {
      setLikedUsers([...likedUsers, user.id]);
      alert(`You liked ${user.username}!`);
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h3>Available Users</h3>
      <button
        onClick={onClose}
        style={{
          padding: "8px 15px",
          marginBottom: "20px",
          cursor: "pointer",
          borderRadius: "8px",
          background: "#828b3e",
          border: "none",
        }}
      >
        Close
      </button>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {dummyUsers.map((user) => (
          <div
            key={user.id}
            style={{
              border: "1px solid #b34949",
              borderRadius: "12px",
              padding: "20px",
              width: "200px",
              textAlign: "center",
            }}
          >
            <img
              src={user.avatar}
              alt={user.username}
              style={{
                width: "130px",
                height: "130px",
                borderRadius: "50%",
                objectFit: "cover",
                marginBottom: "10px",
                border: "2px solid #fff",
              }}
            />
            <div style={{ fontWeight: "bold", marginBottom: "10px" }}>{user.username}</div>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <button
                onClick={() => handleLike(user)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: likedUsers.includes(user.id) ? "red" : "black",
                }}
              >
                <FaHeart size={22} />
              </button>
              <button
                style={{ background: "none", border: "none", cursor: "not-allowed", color: "#beb13b" }}
              >
                <FaComment size={22} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DummyUsers;