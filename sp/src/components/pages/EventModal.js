
import React from "react";
import "../../styles/EventModal.css";

const EventModal = ({ event, moderationNote, onChangeNote, onApprove, onReject, onPending, onClose }) => {
  if (!event) return null;

  const imageUrl = Array.isArray(event.image) && event.image.length > 0
    ? event.image[0]
    : `${process.env.PUBLIC_URL}/images/default-event.jpg`;

  return (
    <div className="eventmodal-backdrop" onClick={onClose}>
    <div className="modal-overlay">
      <div className="modal-content">
        <img src={imageUrl} alt={event.name} className="modal-image" />

        <div className="modal-detail">
          <label><strong>Event Name:</strong></label>
          <p>{event.name}</p>

          <label><strong>Organizer:</strong></label>
          <p>{event.organizer}</p>

          <label><strong>Venue:</strong></label>
          <p>{event.room} (Capacity: {event.capacity})</p>

          <label><strong>Full Location:</strong></label>
          <p>{event.location}</p>

          <label><strong>Date:</strong></label>
          <p>{event.date}</p>

          <label><strong>Time:</strong></label>
          <p>{event.startTime}–{event.endTime}</p>

          <label><strong>Moderation Note:</strong></label>
          <textarea
            placeholder="Add a moderation note (optional)..."
            value={moderationNote}
            onChange={(e) => onChangeNote(e.target.value)}
            className="modal-textarea"
          />
        </div>

        <div className="modal-actions">
          <button className="submit-btn" onClick={onApprove}>Approve</button>
          <button className="clear-btn" onClick={onReject}>Reject</button>

          <button className="pending-btn" onClick={onPending}>Pending</button>


        </div>
      </div>
    </div>
    </div>
  );
};

export default EventModal;
