import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Feed() {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = import.meta.env.VITE_API_URL; // already includes /api

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await axios.get(`${API}/profile`); // ✅ no extra /api
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
            {profile.profilePic && (
              <img
                src={profile.profilePic}
                alt="profile"
                style={{ width: "100%", borderRadius: 8, marginTop: 10 }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Feed;