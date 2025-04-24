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
                item.logo?.startsWith("http")
                  ? item.logo
                  : `${process.env.PUBLIC_URL}/images/default-event.jpg`
              }
              alt={item.name}
              className="club-detail-image"
            />
          </div>
          <div className="text-section">
            <h2 className="detail-title">{item.name}</h2>
            <div className="detail-meta">
              <p>
                <i className="fas fa-star"></i> Status: {item.status}
              </p>
              <p>
                <i className="fas fa-users"></i> Members: {item.members}
              </p>
              <p>
                <i className="fas fa-tags"></i> Category: {item.category}
              </p>
              {presidentName && (
                <p>
                  <i className="fas fa-user-tie"></i> President: {presidentName}
                </p>
              )}
              {item.foundingYear && (
                <p>
                  <i className="fas fa-history"></i> Founded:{" "}
                  {item.foundingYear}
                </p>
              )}
              {item.instagram && (
                <p>
                  <i className="fab fa-instagram"></i>{" "}
                  <a
                    href={item.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                  </a>
                </p>
              )}
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

export default ClubDetail;
