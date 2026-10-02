import React, { useEffect } from "react";
import "../../styles/NewsDetail.css";

const NewsDetail = ({ item, onClose }) => {
  // Lock background scroll
  useEffect(() => {
    if (item) document.body.classList.add("modal-open");
    else document.body.classList.remove("modal-open");
    return () => document.body.classList.remove("modal-open");
  }, [item]);

  if (!item) return null;

  return (
    <div className="news-detail-backdrop" onClick={onClose}>
      <div className="news-detail-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <div className="news-detail-content">
          <div className="image-section">
            <img src={item.image} alt={item.title} className="detail-image" />
          </div>
          <div className="text-section">
            <h2 className="detail-title">{item.title}</h2>
            <div className="news-detail-meta">
              <p>
                <i className="fas fa-user"></i> {item.author}
              </p>
              <p>
                <i className="fas fa-calendar-alt"></i> {item.date}
              </p>
              <p>
                <i className="fas fa-folder-open"></i> {item.category}
              </p>
            </div>
            <div className="scrollable-content">
              <p className="news-detail-description">{item.content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
