import React, { useState, useRef } from "react";
import "../../styles/SuggestNews.css";

const SuggestNews = () => {
  // State for Title, Description, and Uploaded Image
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null); // We'll store as a base64 string for preview

  // State for posts (simulating "Previous Posts")
  const [posts, setPosts] = useState([]);

  // Refs for file input
  const fileInputRef = useRef(null);

  // Handle file selection (browse)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result); // base64 data
      };
      reader.readAsDataURL(file);
    }
  };

  // Optional: handle drag & drop
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Post the new news item
  const handlePost = () => {
    if (!title || !description || !image) return;
    const newPost = {
      title,
      description,
      image,
    };
    setPosts([newPost, ...posts]); // add new post to top
    // Clear fields
    setTitle("");
    setDescription("");
    setImage(null);
  };

  return (
    <div className="suggest-news-container">
      <div className="create-post-section">
        {/* Upload Box */}
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

        {/* Text Fields */}
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

      {/* Previous Posts */}
      <div className="previous-posts-section">
        <h3>Previous Posts</h3>
        <div className="posts-list">
          {posts.length === 0 ? (
            <p className="no-posts-msg">No posts yet.</p>
          ) : (
            posts.map((post, index) => (
              <div key={index} className="post-card">
                <div className="post-header">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="post-image"
                  />
                  <div className="post-info">
                    <p className="author-name">Name Surname</p>
                    {/* e.g. you could store the author or timestamp */}
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
