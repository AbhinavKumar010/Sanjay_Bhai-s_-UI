import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

function CreateProfile() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    age: "",
    bio: "",
    gender: "",
    interests: "",
    profilePic: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, profilePic: file });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async () => {
  if (!form.name || !form.age || !form.bio || !form.gender) {
    setError("Please fill all required fields");
    return;
  }

  if (isNaN(form.age) || Number(form.age) <= 0) {
    setError("Please enter a valid age");
    return;
  }

  setLoading(true);
  setError("");

  try {
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("age", form.age);
    formData.append("bio", form.bio);
    formData.append("gender", form.gender);

    // handle interests array
    form.interests
      ?.split(",")
      .map((i) => i.trim())
      .forEach((i) => formData.append("interests[]", i));

    if (form.profilePic) formData.append("profilePic", form.profilePic);

    await axios.post(`${API}/profile`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert("✅ Profile Saved");
    setForm({
      name: "",
      age: "",
      bio: "",
      gender: "",
      interests: "",
      profilePic: null,
    });
    setPreview(null);
  } catch (err) {
    console.error(err.response || err);
    setError("Failed to save profile. Try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="profile-container">
      <h2>Create Your Profile</h2>
      {error && <p className="error">{error}</p>}

      <label>Name *</label>
      <input
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <label>Age *</label>
      <input
        type="number"
        value={form.age}
        onChange={(e) => setForm({ ...form, age: e.target.value })}
      />

      <label>Bio *</label>
      <textarea
        rows={3}
        value={form.bio}
        onChange={(e) => setForm({ ...form, bio: e.target.value })}
      />

      <label>Gender *</label>
      <select
        value={form.gender}
        onChange={(e) => setForm({ ...form, gender: e.target.value })}
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>

      <label>Interests (comma separated)</label>
      <input
        value={form.interests}
        onChange={(e) => setForm({ ...form, interests: e.target.value })}
      />

      <label>Upload Profile Image</label>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && <img src={preview} alt="Preview" className="preview" />}

      <div className="button-group">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Back
        </button>
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </div>

      <style>{`
        /* Container */
        .profile-container {
          max-width: 100%;
          width: 95%;
          margin: 20px auto;
          padding: 20px;
          border-radius: 10px;
          background-color: #edf1f3;
          font-family: Arial, sans-serif;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        h2 {
          text-align: center;
          margin-bottom: 15px;
          color: #333;
          font-size: 1.5rem;
        }

        label {
          display: block;
          margin-top: 12px;
          font-weight: 600;
          color: #555;
          font-size: 1rem;
        }

        input, select, textarea {
          width: 100%;
          padding: 12px;
          margin-top: 5px;
          border-radius: 8px;
          border: 1px solid #a17f7f;
          font-size: 1rem;
          color: #333;
        }

        textarea {
          resize: none;
        }

        .preview {
          width: 100px;
          height: 100px;
          object-fit: cover;
          margin-top: 10px;
          border-radius: 50%;
          border: 1px solid #ccc;
        }

        .error {
          color: red;
          text-align: center;
          margin-top: 10px;
          font-size: 0.9rem;
        }

        .button-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 20px;
        }

        button {
          padding: 14px;
          font-size: 1rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          width: 100%;
        }

        button:disabled {
          background-color: #a0a0a0;
          cursor: not-allowed;
        }

        .back-btn {
          background-color: #ccc;
          color: #333;
        }

        button:not(.back-btn) {
          background-color: #667eea;
          color: white;
        }

        @media(min-width: 480px) {
          .button-group {
            flex-direction: row;
            justify-content: space-between;
          }
          button {
            width: 48%;
          }
        }
      `}</style>
    </div>
  );
}

export default CreateProfile;