import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import "../../styles/EventRequestModal.css";

const EventRequestModal = ({ item, onClose }) => {
  const [note, setNote] = useState("");

  useEffect(() => {
    document.body.classList.toggle("modal-open", !!item);
    return () => document.body.classList.remove("modal-open");
  }, [item]);

  if (!item) return null;

  const handleDecision = (status) => {
    alert(`Marked as ${status}. Note: ${note}`);
    onClose();
  };

  return createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div className="event-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <h3>{item.name}</h3>
        <p>
          <strong>Organizer:</strong> {item.organization}
        </p>
        <p>
          <strong>Date:</strong> {item.date}, {item.startTime}–{item.endTime}
        </p>
        <p>
          <strong>Venue:</strong> {item.room}
        </p>
        <p>
          <strong>Description:</strong> {item.description}
        </p>
        <p>
          <strong>Equipment:</strong>
          {item.technicalEquipment?.map((eq, i) => (
            <div key={i}>
              {eq.category} ({eq.amount}) {eq.comments ? `- ${eq.comments}` : ""}
            </div>
          ))}
        </p>

        <textarea
          placeholder="Leave a note (optional)..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <div className="modal-buttons">
          <button className="accept-btn" onClick={() => handleDecision("Accepted")}>
            Accept
          </button>
          <button className="reject-btn" onClick={() => handleDecision("Rejected")}>
            Reject
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default EventRequestModal;
