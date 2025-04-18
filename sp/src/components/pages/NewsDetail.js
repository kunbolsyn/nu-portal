// src/components/NewsDetail.js
import React from "react";
import "../../styles/NewsDetail.css";

const NewsDetail = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="news-detail-backdrop" onClick={onClose}>
      <div className="news-detail-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <img src={item.image} alt={item.title} className="detail-image" />
        <h2 className="detail-title">{item.title}</h2>
        <div className="detail-meta">
          <p>
            <i className="fas fa-user"></i> {item.author}
          </p>
          <p>
            <i className="fas fa-calendar-alt"></i> {item.date}
          </p>
        </div>
        <p className="category">{item.category}</p>
        <p className="detail-content">{item.content}</p>
      </div>
    </div>
  );
};

export default NewsDetail;
