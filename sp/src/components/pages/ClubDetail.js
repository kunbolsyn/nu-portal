// src/components/pages/ClubDetail.js
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import "../../styles/ClubDetail.css";

const ClubDetail = ({ item, onClose }) => {
  useEffect(() => {
    document.body.classList.toggle("modal-open", !!item);
    return () => document.body.classList.remove("modal-open");
  }, [item]);

  if (!item) return null;

  const presidentName = item?.president
    ? `${item.president.name || ""} ${item.president.surname || ""}`.trim()
    : null;

  return createPortal(
    <div className="club-detail-backdrop" onClick={onClose}>
      <div className="club-detail-modal" onClick={(e) => e.stopPropagation()}>
        <button className="club-close-btn" onClick={onClose}>
          ×
        </button>
        <div className="club-detail-content">
          <div className="image-section">
            <img
              src={
                item.logo?.filePath
                  ? item.logo.filePath
                  : `${process.env.PUBLIC_URL}/images/default-event.jpg`
              }
              alt={item.name}
              className="club-detail-image"
            />
          </div>
          <div className="text-section">
            <h2 className="detail-title">{item.title}</h2>
            <div className="detail-meta">
              <p>
                <i className="fas fa-tags"></i> Category: {item.category}
              </p>
              {presidentName && (
                <p>
                  <i className="fas fa-user-tie"></i> President: {presidentName}
                </p>
              )}
              <p>
                <i className="fas fa-envelope"></i> Email: {item.corpEmail}
              </p>
            </div>
            <div className="scrollable-content">
              <p className="detail-aims">
                <strong>Aim:</strong> {item.aims}
              </p>
              <p className="detail-description">
                <strong>Description:</strong> {item.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ClubDetail;
