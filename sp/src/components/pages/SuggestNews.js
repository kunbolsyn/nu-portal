// src/components/pages/SuggestNews.js
import React, { useState, useRef, useEffect } from "react";
import "../../styles/SuggestNews.css";

const API_BASE = "https://senior-project-java-backend.onrender.com";

const SuggestNews = () => {
  const [profile, setProfile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const fileInputRef = useRef(null);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("userRole");
  const accountId = localStorage.getItem("accountId");
  const username = localStorage.getItem("username");

  // 1) Fetch user profile for name/surname
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        let endpoint = "";
        if (role === "student") {
          endpoint = `/api/v1/student/accountid/${accountId}`;
        } else if (role === "faculty") {
          endpoint = `/api/v1/teachingstaff/accountid/${accountId}`;
        } else {
          endpoint = `/api/v1/staff/accountid/${accountId}`;
        }

        const res = await fetch(`${API_BASE}${endpoint}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) return;
        setProfile(await res.json());
      } catch {
        // silently fail
      }
    };
    if (accountId && token) fetchProfile();
  }, [role, accountId, token]);

  // 2) Fetch all posts by this user
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const url = `${API_BASE}/api/news/email/${encodeURIComponent(
          username
        )}`;
        const res = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        // No content? just clear posts.
        if (res.status === 204) {
          setPosts([]);
          return;
        }
        if (!res.ok) {
          // non-OK (404, etc) → treat as no posts
          setPosts([]);
          return;
        }

        const data = await res.json();
        setPosts(data.reverse());
      } catch {
        // network error → do nothing
      }
    };

    if (username && token) fetchPosts();
  }, [username, token]);

  // File handlers
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };
  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  // 3) Post new suggestion
  const handlePost = async () => {
    if (!title || !description) return;
    const today = new Date().toISOString().split("T")[0];
    const payload = {
      newsTitle: title,
      text_content: description,
      email: username,
      newsDateRequestSent: today,
      status: "waiting",
      name: profile?.name,
      surname: profile?.surname,
      photos: image ? [{ filePath: image }] : [],
      videos: [],
      downloadable_files: [],
    };
    try {
      const res = await fetch(`${API_BASE}/api/news`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) return;
      const saved = await res.json();
      setPosts((p) => [saved, ...p]);
      setTitle("");
      setDescription("");
      setImage(null);
    } catch {
      // silently fail
    }
  };

  return (
    <div className="suggest-news-container">
      {/* Create News Section */}
      <div className="suggest-section-header">
        <i className="fas fa-pen-nib" />
        <h3>Create News</h3>
      </div>
      <div className="create-post-section">
        <div
          className="upload-box"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current.click()}
        >
          {image ? (
            <img src={image} alt="Preview" className="preview-img" />
          ) : (
            <div className="upload-placeholder">
              <div className="upload-icon">+</div>
              <p>
                Drop your image here or <span>browse</span>
              </p>
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>

        <div className="news-fields">
          <label>Title</label>
          <div className="title-input-wrapper">
            <input
              type="text"
              value={title}
              placeholder="Once upon a time..."
              maxLength={180}
              onChange={(e) => setTitle(e.target.value)}
            />
            <span className="char-counter">{180 - title.length}</span>
          </div>

          <label>Description</label>
          <div className="desc-input-wrapper">
            <textarea
              value={description}
              placeholder="The start of a wonderful story..."
              maxLength={360}
              onChange={(e) => setDescription(e.target.value)}
            />
            <span className="char-counter">{360 - description.length}</span>
          </div>

          <button onClick={handlePost}>Post</button>
        </div>
      </div>

      {/* Previous Posts Section */}
      <div className="suggest-section-header">
        <i className="fas fa-history" />
        <h3>Previous Posts</h3>
      </div>
      <div className="previous-posts-section">
        {posts.length === 0 ? (
          <p className="no-posts-msg">No posts yet.</p>
        ) : (
          <table className="posts-table">
            <thead>
              <tr>
                <th>Photo</th>
                <th>Author</th>
                <th>Title</th>
                <th>Date Requested</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.news_id}>
                  <td>
                    {p.photos?.[0]?.filePath ? (
                      <img
                        src={p.photos[0].filePath}
                        alt=""
                        className="post-thumb"
                      />
                    ) : (
                      <div className="post-thumb empty" />
                    )}
                  </td>
                  <td>{`${p.name} ${p.surname}`}</td>
                  <td>{p.newsTitle}</td>
                  <td>{p.newsDateRequestSent}</td>
                  <td>{p.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SuggestNews;
