import React, { useState, useRef, useEffect } from "react";
import "../../styles/SuggestNews.css";

const API_BASE = "https://senior-project-java-backend.onrender.com";
const IDS_KEY = "suggestedNewsIds";

const SuggestNews = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null); // base64
  const [posts, setPosts] = useState([]); // fetched posts
  const fileInputRef = useRef(null);

  // Load previous post IDs and fetch each post
  useEffect(() => {
    const saved = localStorage.getItem(IDS_KEY);
    if (!saved) return;

    const ids = JSON.parse(saved);
    if (!ids.length) return;

    Promise.all(
      ids.map((id) =>
        fetch(`${API_BASE}/api/news/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }).then((res) => {
          if (!res.ok) throw new Error(`Failed to fetch post ${id}`);
          return res.json();
        })
      )
    )
      .then((fetchedPosts) => {
        // Show newest first
        setPosts(fetchedPosts.reverse());
      })
      .catch((err) => console.error("Error loading previous posts:", err));
  }, []);

  // Handle file select / drag & drop
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

  // Create a new news suggestion
  const handlePost = async () => {
    if (!title || !description || !image) return;

    const payload = { title, description, image, status: "waiting" };
    try {
      const res = await fetch(`${API_BASE}/api/news`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        console.error("Failed to post news:", res.statusText);
        return;
      }
      const savedPost = await res.json();
      // Update ID list in localStorage
      const prevIds = JSON.parse(localStorage.getItem(IDS_KEY) || "[]");
      const newIds = [...prevIds, savedPost.id];
      localStorage.setItem(IDS_KEY, JSON.stringify(newIds));

      // Prepend new post to state
      setPosts((p) => [savedPost, ...p]);
      // Clear form
      setTitle("");
      setDescription("");
      setImage(null);
    } catch (err) {
      console.error("Error posting news:", err);
    }
  };

  return (
    <div className="suggest-news-container">
      <div className="suggest-section-header">
        <i className="fas fa-pen-nib"></i>
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

      <div className="suggest-section-header">
        <i className="fas fa-history"></i>
        <h3>Previous Posts</h3>
      </div>
      <div className="previous-posts-section">
        <div className="posts-list">
          {posts.length === 0 ? (
            <p className="no-posts-msg">No posts yet.</p>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="post-card">
                <div className="post-header">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="post-image"
                  />
                  <div className="post-info">
                    <p className="author-name">You</p>
                    <p className="post-status">
                      Status: <strong>{post.status}</strong>
                    </p>
                    <p className="post-id">ID: {post.id}</p>
                  </div>
                </div>
                <h4 className="post-title">{post.title}</h4>
                <p className="post-desc">{post.description}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SuggestNews;
