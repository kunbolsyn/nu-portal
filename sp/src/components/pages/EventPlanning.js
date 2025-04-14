// src/components/pages/EventPlanning.js
import React, { useState, useRef } from "react";
import "../../styles/EventPlanning.css";

const EventPlanning = () => {
  const [organization, setOrganization] = useState("");
  const [eventName, setEventName] = useState("");
  const [room, setRoom] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [inventory, setInventory] = useState("");
  const fileInputRef = useRef(null);
  const [attachedFile, setAttachedFile] = useState(null);

  const handleFileChange = (e) => {
    setAttachedFile(e.target.files[0]);
  };

  const handleClear = () => {
    setOrganization("");
    setEventName("");
    setRoom("");
    setDate("");
    setTime("");
    setDescription("");
    setInventory("");
    setAttachedFile(null);
  };

  const handleSubmit = () => {
    // Process form data here
    alert("Request sent successfully!");
    handleClear();
  };

  return (
    <div className="event-planning-container">
  <h2><i className="fas fa-calendar-plus"></i> Create Event</h2>
  <div className="event-form">
    <label>Organization name</label>
    <input type="text" placeholder="Organization" />

    <label>Event Name</label>
    <input type="text" placeholder="Event Name" />

    <label>Room number</label>
    <select>
      <option value="">Room</option>
      <option value="101">Room 101</option>
    </select>

    <div className="event-row">
      <div>
        <label>Date</label>
        <input type="date" />
      </div>
      <div>
        <label>Time</label>
        <input type="time" />
      </div>
    </div>

    <p style={{ color: "green", marginBottom: "10px" }}>Available</p>

    <div className="event-row">
      <div>
        <label>Short Description of Event</label>
        <textarea placeholder="Type here..." />
      </div>
      <div>
        <label>Required Inventory</label>
        <textarea placeholder="Type here..." />
      </div>
    </div>

    <label className="attach-label">Attach files</label>

    <div className="event-buttons">
      <button className="clear-btn">Clear</button>
      <button className="submit-btn">Send a request</button>
    </div>
  </div>
</div>

  );
};

export default EventPlanning;
