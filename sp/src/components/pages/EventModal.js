import React from "react";
import "../../styles/EventModal.css";

const EventModal = ({
  event,
  moderationNote,
  onChangeNote,
  onApprove,
  onReject,
  onPending,
  onClose,
}) => {
  if (!event) return null;

  const data = event.fullEventData;

  // Image URL: first photo or default
  const imageUrl =
    data.photo?.filePath ||
    (Array.isArray(data.photos_link) && data.photos_link[0]) ||
    data.photos_link ||
    `${process.env.PUBLIC_URL}/images/default-event.jpg`;

  // Format time object
  let timeDisplay = "-";
  const t = data.time;
  if (typeof t === "string") {
    timeDisplay = t;
  } else if (t?.hour != null) {
    const h = String(t.hour).padStart(2, "0");
    const m = String(t.minute).padStart(2, "0");
    const s = String(t.second).padStart(2, "0");
    timeDisplay = `${h}:${m}:${s}`;
  }

  // Venue details
  const venue = data.venue || {};

  return (
    <div className="eventmodal-backdrop" onClick={onClose}>
      <div className="modal-overlay" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <img src={imageUrl} alt={data.eventTitle} className="modal-image" />

          <div className="modal-detail">
            <label>
              <strong>Event Title:</strong>
            </label>
            <p>{data.eventTitle}</p>

            <label>
              <strong>Description:</strong>
            </label>
            <p>{data.description}</p>

            <label>
              <strong>Organizer:</strong>
            </label>
            <p>{data.organizer}</p>

            <label>
              <strong>Date:</strong>
            </label>
            <p>{data.date}</p>

            <label>
              <strong>Date Request Sent:</strong>
            </label>
            <p>{data.date_request_sent}</p>

            <label>
              <strong>Time:</strong>
            </label>
            <p>{timeDisplay}</p>

            <label>
              <strong>Venue Title:</strong>
            </label>
            <p>{venue.venueTitle}</p>

            <label>
              <strong>Location:</strong>
            </label>
            <p>{venue.location}</p>

            <label>
              <strong>Material Support:</strong>
            </label>
            <p>{data.material_support}</p>

            <label>
              <strong>Moderation Note:</strong>
            </label>
            <textarea
              placeholder="Add a moderation note (optional)..."
              value={moderationNote}
              onChange={(e) => onChangeNote(e.target.value)}
              className="modal-textarea"
            />
          </div>

          <div className="modal-actions">
            <button className="submit-btn" onClick={onApprove}>
              Approve
            </button>
            <button className="clear-btn" onClick={onReject}>
              Reject
            </button>
            <button className="pending-btn" onClick={onPending}>
              Pending
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
