import React from "react";
import "../../styles/EventDetail.css";

const EventDetail = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="event-detail-backdrop" onClick={onClose}>
      <div className="event-detail-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <img src={item.image} alt={item.title} className="detail-image" />
        <h2 className="detail-title">{item.title}</h2>
        <div className="detail-meta">
          <p>
            <i className="fas fa-user"></i> {item.organizer}
          </p>
          <p>
            <i className="fas fa-calendar-alt"></i> {item.date}
          </p>
          {item.club && <p className="detail-club">{item.club}</p>}
        </div>
        <p className="detail-description">{item.description}</p>
      </div>
    </div>
  );
};

export default EventDetail;
