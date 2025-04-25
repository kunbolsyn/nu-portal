// src/components/pages/EventDetail.js
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import "../../styles/EventDetail.css";

const EventDetail = ({ item, onClose }) => {
  useEffect(() => {
    document.body.classList.toggle("modal-open", !!item);
    return () => document.body.classList.remove("modal-open");
  }, [item]);

  if (!item) return null;

  return createPortal(
    <div className="event-detail-backdrop" onClick={onClose}>
      <div className="event-detail-modal" onClick={(e) => e.stopPropagation()}>
        <button className="event-close-btn" onClick={onClose}>
          ×
        </button>
        <div className="event-detail-content">
          {/* Image */}
          <div className="image-section">
            <img
              src={item.photo?.filePath || item.image}
              alt={item.title}
              className="detail-image"
            />
          </div>

          {/* Text */}
          <div className="text-section">
            {/* Title */}
            <h2 className="detail-title">{item.title}</h2>

            {/* Meta with Icons */}
            <div className="detail-meta">
              <p>
                <i className="fas fa-user"></i> {item.organizer}
              </p>
              <p>
                <i className="fas fa-calendar-alt"></i> {item.date}
              </p>
              <p>
                <i className="fas fa-clock"></i> {item.time}
              </p>
              <p>
                <i className="fas fa-map-marker-alt"></i> {item.venue}
              </p>
            </div>

            {/* Description */}
            <div className="scrollable-content">
              <p className="detail-description">{item.description}</p>
              {item.qr_code && (
                <div className="qr-code-section">
                  <img
                    src={item.qr_code}
                    alt="Event QR Code"
                    className="qr-code-img"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default EventDetail;
