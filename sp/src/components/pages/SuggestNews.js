// src/components/pages/SuggestNews.js
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/SuggestNews.css";

const API_BASE = "https://senior-project-java-backend.onrender.com";

const SuggestNews = () => {
  const [profile, setProfile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("userRole");
  const accountId = localStorage.getItem("accountId");
  const username = localStorage.getItem("username");

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!token) navigate("/");
  }, [token, navigate]);

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      let endpoint;
      if (role === "student")
        endpoint = `/api/v1/student/accountid/${accountId}`;
      else if (role === "faculty")
        endpoint = `/api/v1/teachingstaff/accountid/${accountId}`;
      else endpoint = `/api/v1/staff/accountid/${accountId}`;

      try {
        const res = await fetch(`${API_BASE}${endpoint}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) return;
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    if (accountId && token) fetchProfile();
  }, [role, accountId, token]);

  // Fetch user's posts
  useEffect(() => {
    const fetchPosts = async () => {
      const url = `${API_BASE}/api/news/email/${encodeURIComponent(username)}`;
      try {
        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        if (res.status === 204) {
          setPosts([]);
          return;
        }
        if (!res.ok) {
          console.warn("Error loading posts:", await res.text());
          return;
        }

        const data = await res.json();
        setPosts(data.reverse());
      } catch (err) {
        console.error("Error loading posts:", err);
      }
    };

    if (username && token) fetchPosts();
  }, [username, token]);

  // File handlers
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };
  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) setImage(file);
  };

  // Post new suggestion
  const handlePost = async () => {
    if (!title || !description) return;
    if (!token) {
      console.warn("No token—cannot post news.");
      return;
    }

    setLoading(true);
    const today = new Date().toISOString().split("T")[0];
    const formData = new FormData();

    const newsData = {
      newsTitle: title,
      text_content: description,
      email: username,
      newsDateRequestSent: today,
      newsDatePosted: today,
      status: "waiting",
      name: profile?.name,
      surname: profile?.surname,
      photo: null,
      videos: [],
      downloadable_files: [],
    };
    const newsBlob = new Blob([JSON.stringify(newsData)], {
      type: "application/json",
    });
    formData.append("news", newsBlob);

    if (image) {
      formData.append("file", image);
    }

    try {
      const res = await fetch(`${API_BASE}/api/news`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: formData,
      });

      if (!res.ok) {
        console.warn("Failed to post news:", await res.text());
        return;
      }

      const saved = await res.json();
      setPosts((prev) => [saved, ...prev]);
      setTitle("");
      setDescription("");
      setImage(null);
    } catch (err) {
      console.error("Network error posting news:", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete a post
  const handleDeletePost = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      const res = await fetch(`${API_BASE}/api/news/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        console.error("Failed to delete post:", await res.text());
        return;
      }
      setPosts((prev) => prev.filter((post) => post.news_id !== id));
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  return (
    <div className="suggest-news-container">
      {/* Create News */}
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
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="preview-img"
            />
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

          <button
            onClick={handlePost}
            disabled={loading}
            style={{ backgroundColor: loading ? "#ccc" : undefined }}
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </div>
      </div>

      {/* Previous Posts */}
      <div className="suggest-section-header" style={{ marginTop: "2rem" }}>
        <i className="fas fa-history" />
        <h3>Previous Posts</h3>
      </div>

      <div className="previous-posts-section">
        {posts.length === 0 ? (
          <p className="no-posts-msg">No posts yet.</p>
        ) : (
          <table className="event-table">
            <thead>
              <tr>
                <th>Photo</th>
                <th>Author</th>
                <th>Title</th>
                <th>Date Requested</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.news_id}>
                  <td>
                    {p.photo?.filePath ? (
                      <img
                        src={p.photo.filePath}
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
                  <td>
                    <span className={`status-badge ${p.status.toLowerCase()}`}>
                      {p.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="delete-post-btn"
                      title="Delete post"
                      onClick={() => handleDeletePost(p.news_id)}
                    >
                      <i className="fas fa-trash-alt" />
                    </button>
                  </td>
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
