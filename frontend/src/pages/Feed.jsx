import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Feed() {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await axios.get(`${API}/profile`);
        console.log("Fetched profiles:", res.data);
        setProfiles(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching profiles:", err);
        setProfiles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const handleChat = (name) => alert(`📩 Chat request sent to ${name}`);
  const handleAudioCall = (name) => alert(`🎧 Audio call request sent to ${name}`);
  const handleVideoCall = (name) => alert(`🎥 Video call request sent to ${name}`);

  return (
    <div style={{ padding: 20 }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: 20,
          padding: "8px 16px",
          borderRadius: 8,
          background: "#667eea",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        ← Back
      </button>

      <h2>Profiles Feed</h2>
      {loading && <p>Loading profiles...</p>}
      {!loading && profiles.length === 0 && <p>No profiles found.</p>}

      <div style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "center" }}>
        {profiles.map((profile) => (
          <div
            key={profile._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: 8,
              padding: 16,
              width: "100%",
              maxWidth: 220,
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              boxSizing: "border-box",
            }}
          >
            <h3>{profile.name}</h3>
            <p>Age: {profile.age}</p>
            <p>Gender: {profile.gender}</p>
            <p>Bio: {profile.bio}</p>
            <p>Interests: {profile.interests?.join(", ")}</p>
            <p>
              Status:{" "}
              <span style={{ color: profile.isAvailable ? "green" : "red" }}>
                {profile.isAvailable ? "Available" : "Offline"}
              </span>
            </p>

            {profile.profilePic && (
              <img
                src={profile.profilePic}
                alt="profile"
                style={{ width: "100%", borderRadius: 8, marginTop: 10 }}
              />
            )}

            <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
              {profile.isAvailable && profile.canChat && (
                <button
                  onClick={() => handleChat(profile.name)}
                  style={{ padding: "6px", borderRadius: 6, background: "#4caf50", color: "white", border: "none", cursor: "pointer" }}
                >
                  Chat
                </button>
              )}
              {profile.isAvailable && profile.canAudioCall && (
                <button
                  onClick={() => handleAudioCall(profile.name)}
                  style={{ padding: "6px", borderRadius: 6, background: "#2196f3", color: "white", border: "none", cursor: "pointer" }}
                >
                  Audio Call
                </button>
              )}
              {profile.isAvailable && profile.canVideoCall && (
                <button
                  onClick={() => handleVideoCall(profile.name)}
                  style={{ padding: "6px", borderRadius: 6, background: "#f44336", color: "white", border: "none", cursor: "pointer" }}
                >
                  Video Call
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Feed;