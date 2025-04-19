// src/components/pages/EventDetail.js
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import "../../styles/EventDetail.css";

const EventDetail = ({ item, onClose }) => {
  // Lock background scroll
  useEffect(() => {
    document.body.classList.toggle("modal-open", !!item);
    return () => document.body.classList.remove("modal-open");
  }, [item]);

  if (!item) return null;

  // Everything inside this portal will be appended to <body>
  return createPortal(
    <div className="event-detail-backdrop" onClick={onClose}>
      <div className="event-detail-modal" onClick={(e) => e.stopPropagation()}>
        <button className="event-close-btn" onClick={onClose}>
          ×
        </button>
        <div className="event-detail-content">
          <div className="image-section">
            <img src={item.image} alt={item.title} className="detail-image" />
          </div>
          <div className="text-section">
            <h2 className="detail-title">{item.title}</h2>
            <div className="detail-meta">
              <p>
                <i className="fas fa-user"></i> {item.organizer}
              </p>
              <p>
                <i className="fas fa-calendar-alt"></i> {item.date}
              </p>
            </div>
            <div className="scrollable-content">
              <p className="detail-description">{item.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default EventDetail;
