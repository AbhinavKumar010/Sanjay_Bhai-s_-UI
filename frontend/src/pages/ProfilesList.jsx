import { useState, useEffect } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

function ProfilesList() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await axios.get(`${API}/profiles`);
        setProfiles(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load profiles");
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  if (loading) return <p>Loading profiles...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="profiles-container">
      <h2>All Users</h2>
      <div className="profiles-grid">
        {profiles.map((p) => (
          <div key={p._id} className="profile-card">
            {p.profilePic && (
              <img src={p.profilePic} alt={p.name} className="profile-pic" />
            )}
            <h3>{p.name}</h3>
            <p>Age: {p.age}</p>
            <p>Gender: {p.gender}</p>
            <p>Bio: {p.bio}</p>
            {p.interests && <p>Interests: {p.interests.join(", ")}</p>}
          </div>
        ))}
      </div>

      <style>{`
        .profiles-container { max-width: 90%; margin: 20px auto; }
        .profiles-grid { display: grid; gap: 20px; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }
        .profile-card { padding: 15px; border: 1px solid #ccc; border-radius: 10px; text-align: center; background: #f9f9f9; }
        .profile-pic { width: 100px; height: 100px; object-fit: cover; border-radius: 50%; margin-bottom: 10px; }
      `}</style>
    </div>
  );
}

export default ProfilesList;