import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Feed() {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]); // ✅ Initialize as array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/profile"); // replace with live URL if deployed
        setProfiles(Array.isArray(res.data) ? res.data : []); // ✅ ensure array
      } catch (err) {
        console.error(err);
        setProfiles([]); // fallback
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      {/* Back Button */}
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

      <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
        {Array.isArray(profiles) &&
          profiles.map((profile) => (
            <div
              key={profile.userId}
              style={{
                border: "1px solid #ccc",
                borderRadius: 8,
                padding: 16,
                width: 220,
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
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
                  width={180}
                  style={{ borderRadius: 8, marginTop: 10 }}
                />
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default Feed;