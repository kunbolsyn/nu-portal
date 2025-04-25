// src/components/pages/EventPlanning.js
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/EventPlanning.css";

const API_BASE = "https://senior-project-java-backend.onrender.com";

const EventPlanning = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const [events, setEvents] = useState([]);

  // Form state
  const [organization, setOrganization] = useState("");
  const [eventName, setEventName] = useState("");
  const [venueId, setVenueId] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("00:00");
  const [description, setDescription] = useState("");
  const [inventory, setInventory] = useState("");
  const [technicalEquipment, setTechnicalEquipment] = useState([]);
  const [equipmentInput, setEquipmentInput] = useState({
    category: "",
    amount: "",
    comments: "",
  });
  const [contactPersons, setContactPersons] = useState([]);
  const [personInput, setPersonInput] = useState({
    name: "",
    phone: "",
    id: "",
  });
  const [additionalComments, setAdditionalComments] = useState("");

  // Image upload state
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  // Backend-driven state
  const [venues, setVenues] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [availability, setAvailability] = useState("Unavailable");

  // Fetch my events
  useEffect(() => {
    if (!username || !token) return;

    fetch(`${API_BASE}/api/events/email/${encodeURIComponent(username)}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch events");
        return res.json();
      })
      .then((data) => setEvents(data))
      .catch((err) => console.error("Error loading events:", err));
  }, [username, token]);

  //Delete event
  // DELETE an event by its ID
  const handleDeleteEvent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      const res = await fetch(`${API_BASE}/api/events/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        console.error("Failed to delete event:", await res.text());
        return;
      }
      // Remove from state
      setEvents((prev) => prev.filter((e) => e.eventId !== id));
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };

  // Fetch all venues
  useEffect(() => {
    fetch(`${API_BASE}/api/venues/all`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setVenues)
      .catch(console.error);
  }, [token]);

  // Fetch reservations for selected venue
  useEffect(() => {
    if (!venueId) return;
    fetch(`${API_BASE}/api/venue-reservations/${venueId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setReservations)
      .catch(console.error);
  }, [venueId, token]);

  // Recalculate availability
  useEffect(() => {
    if (!venueId || !date || !startTime || !endTime) {
      setAvailability("Unavailable");
      return;
    }
    const conflict = reservations.some((r) => {
      const from = `${String(r.time_from.hour).padStart(2, "0")}:${String(
        r.time_from.minute
      ).padStart(2, "0")}`;
      const to = `${String(r.time_to.hour).padStart(2, "0")}:${String(
        r.time_to.minute
      ).padStart(2, "0")}`;
      return !(endTime <= from || startTime >= to);
    });
    setAvailability(conflict ? "Unavailable" : "Available");
  }, [venueId, date, startTime, endTime, reservations]);

  // File handlers
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };
  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) setImage(file);
  };

  // Add contact person
  const addContactPerson = () => {
    if (!personInput.name || !personInput.phone || !personInput.id) return;
    setContactPersons([...contactPersons, personInput]);
    setPersonInput({ name: "", phone: "", id: "" });
  };

  // Add technical equipment
  const addEquipment = () => {
    if (!equipmentInput.category || Number(equipmentInput.amount) < 1) return;
    setTechnicalEquipment([...technicalEquipment, equipmentInput]);
    setEquipmentInput({ category: "", amount: "", comments: "" });
  };

  // Submit handler
  const handleSubmit = async () => {
    if (availability !== "Available") {
      alert("Selected venue/time is unavailable.");
      return;
    }
    if (!eventName || !organization || !venueId || !date) {
      alert("Please fill in all required fields.");
      return;
    }

    // Build time string: HH:mm:ss
    const [h, m] = startTime.split(":");
    const timeString = `${h.padStart(2, "0")}:${m.padStart(2, "0")}:00`;

    // Assemble event JSON
    const today = new Date().toISOString().split("T")[0];
    const eventData = {
      eventTitle: eventName,
      description,
      organizer: organization,
      organizer_type: "organization",
      time: timeString,
      date,
      date_request_sent: today,
      venue: { venue_id: parseInt(venueId, 10) },
      participants_number: contactPersons.length,
      material_support: inventory,
      technical_support: JSON.stringify(technicalEquipment),
      type: "waiting",
      comment: additionalComments,
      email: username,
    };

    // Build FormData with JSON Blob
    const formData = new FormData();
    const eventBlob = new Blob([JSON.stringify(eventData)], {
      type: "application/json",
    });
    formData.append("event", eventBlob);
    if (image) formData.append("file", image);

    // POST to backend
    try {
      const res = await fetch(`${API_BASE}/api/events`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: formData,
      });
      if (res.ok) {
        alert("Event request submitted!");
        navigate("/events");
      } else {
        const txt = await res.text();
        alert("Error submitting event: " + txt);
      }
    } catch (err) {
      console.error("Network error:", err);
      alert("Network error submitting event");
    }
  };

  const formatEventTime = (t) => {
    if (!t) return "-";
    if (typeof t === "string") return t;
    const h = String(t.hour).padStart(2, "0");
    const m = String(t.minute).padStart(2, "0");
    return `${h}:${m}:00`;
  };

  return (
    <div className="event-planning-container">
      <div className="section-header">
        <i className="fas fa-calendar-plus"></i>
        <h3>Create Event</h3>
      </div>

      <div className="event-form">
        <div className="photo-info-row">
          {/* Image Upload */}
          <div className="photo-section">
            <div
              className="upload-box"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current.click()}
            >
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="preview-img"
                />
              ) : (
                <div className="upload-placeholder">
                  <div className="upload-icon">+</div>
                  <p>
                    Drop image or <span>browse</span>
                  </p>
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>
          </div>

          {/* Right side inputs */}
          <div className="event-info-fields">
            <label>Organization Name</label>
            <input
              type="text"
              placeholder="Organization..."
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
            />

            <label>Event Name</label>
            <input
              type="text"
              placeholder="Event Name..."
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
          </div>
        </div>

        <div className="event-row-group">
          <div className="event-field">
            <label>Venue</label>
            <select
              value={venueId}
              onChange={(e) => setVenueId(e.target.value)}
            >
              <option value="">Select venue…</option>
              {venues.map((v) => (
                <option key={v.venue_id} value={v.venue_id}>
                  {v.venueTitle}
                </option>
              ))}
            </select>
          </div>

          <div className="event-field">
            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="event-field">
            <label>Time</label>
            <div className="time-range">
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
              <span>–</span>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <label>Short Description</label>
        <textarea
          placeholder="Description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Contacts */}
        <div className="contact-group">
          <label>Contact Persons</label>

          <div className="contact-row-group">
            <div className="contact-field">
              <input
                type="text"
                placeholder="Name"
                value={personInput.name}
                onChange={(e) =>
                  setPersonInput({ ...personInput, name: e.target.value })
                }
              />
            </div>

            <div className="contact-field">
              <input
                type="text"
                placeholder="Phone"
                value={personInput.phone}
                onChange={(e) =>
                  setPersonInput({ ...personInput, phone: e.target.value })
                }
              />
            </div>

            <div className="contact-field">
              <input
                type="text"
                placeholder="ID Number"
                value={personInput.id}
                onChange={(e) =>
                  setPersonInput({ ...personInput, id: e.target.value })
                }
              />
            </div>
          </div>

          <div className="contact-button-row">
            <button onClick={addContactPerson}>Add</button>
          </div>
        </div>

        {/* List added contacts */}
        {contactPersons.length > 0 && (
          <div className="contact-list">
            {contactPersons.map((p, i) => (
              <div key={i}>
                {p.name} – {p.phone} – {p.id}
              </div>
            ))}
          </div>
        )}

        {/* Inventory */}
        <label>Required Inventory</label>
        <textarea
          placeholder="Furniture..."
          value={inventory}
          onChange={(e) => setInventory(e.target.value)}
        />

        {/* Equipment */}
        <div className="equipment-group">
          <label>Technical Equipment</label>

          <div className="equipment-row-group">
            <div className="equipment-field">
              <input
                list="eq-options"
                placeholder="Category"
                value={equipmentInput.category}
                onChange={(e) =>
                  setEquipmentInput({
                    ...equipmentInput,
                    category: e.target.value,
                  })
                }
              />
              <datalist id="eq-options">
                <option>Projector</option>
                <option>Microphone</option>
                <option>Speaker</option>
              </datalist>
            </div>

            <div className="equipment-field">
              <input
                type="number"
                min="1"
                placeholder="Amount"
                value={equipmentInput.amount}
                onChange={(e) =>
                  setEquipmentInput({
                    ...equipmentInput,
                    amount: e.target.value,
                  })
                }
              />
            </div>

            <div className="equipment-field">
              <input
                type="text"
                placeholder="Comments"
                value={equipmentInput.comments}
                onChange={(e) =>
                  setEquipmentInput({
                    ...equipmentInput,
                    comments: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="equipment-button-row">
            <button onClick={addEquipment}>Add</button>
          </div>
        </div>

        {/* List added equipment */}
        {technicalEquipment.map((eq, i) => (
          <div key={i} className="equipment-item">
            {eq.category} ({eq.amount}) {eq.comments}
          </div>
        ))}

        {/* Additional Comments */}
        <label>Additional Comments</label>
        <textarea
          placeholder="Anything else..."
          value={additionalComments}
          onChange={(e) => setAdditionalComments(e.target.value)}
        />

        {/* Image Upload */}

        {/* Submit */}
        <button className="submit-btn" onClick={handleSubmit}>
          Send a request
        </button>
      </div>

      <div className="my-events">
        <table className="event-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>ID</th>
              <th>Date</th>
              <th>Venue</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {events.map((evt) => {
              // Format time whether it's a string or object

              return (
                <tr key={evt.eventId}>
                  <td>{evt.eventTitle}</td>
                  <td>{evt.eventId}</td>
                  <td>{evt.date}</td>
                  <td>{evt.venue?.venueTitle || "-"}</td>
                  <td>
                    <span className={`status-badge ${evt.type.toLowerCase()}`}>
                      {evt.type}
                    </span>
                  </td>
                  <td>
                    <button
                      className="delete-event-btn"
                      title="Delete event"
                      onClick={() => handleDeleteEvent(evt.eventId)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventPlanning;
