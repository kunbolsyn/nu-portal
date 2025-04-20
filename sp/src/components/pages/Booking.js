import React, { useState } from "react";
import "../../styles/Booking.css";

const RoomBooking = () => {
  const [formData, setFormData] = useState({
    room: "2.105",
    date: "",
    startTime: "08:00",
    endTime: "23:59",
    club: "NU Art Studio Club",
    purpose: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking data:", formData);
  };

  return (
    <div className="booking-container">
      <div className="section-header">
        <i className="fa fa-door-open"></i>
        <h3>Room Booking</h3>
      </div>
      <div className="booking-card user-info-card">
        <div className="user-info-row">
          <span className="label">First name:</span>
          <span className="value">Alisher</span>
          <span className="label">School:</span>
          <span className="value">
            School of Engineering and Digital Sciences
          </span>
        </div>
        <div className="user-info-row">
          <span className="label">Last name:</span>
          <span className="value">Kunbolsyn</span>
          <span className="label">Major:</span>
          <span className="value">Computer Science</span>
        </div>
        <div className="user-info-row">
          <span className="label">Phone:</span>
          <span className="value">+7 (707) 123‑4567</span>
        </div>
      </div>

      {/* Booking Form Card */}
      <form className="booking-card booking-form" onSubmit={handleSubmit}>
        <label>
          Room Number
          <select name="room" value={formData.room} onChange={handleChange}>
            <option>2.105</option>
            <option>2.104</option>
            {/* … */}
          </select>
        </label>

        <label>
          Date
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </label>

        <label>
          Time
          <div className="time-range">
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
            />
            <span>—</span>
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
            />
          </div>
        </label>

        <label>
          Clubs
          <select name="club" value={formData.club} onChange={handleChange}>
            <option>NU Art Studio Club</option>
            {/* … */}
          </select>
        </label>

        <div className="availability">No availability</div>

        <div className="room-details">
          <p>
            <strong>Specification:</strong> Lecture, Tutorial, Seminar
          </p>
          <p>
            <strong>Capacity:</strong> 64
          </p>
          <p>
            <strong>Equipment:</strong> PC, Projector, Speakers, Camera, Audio
            Cabinet, Microphone
          </p>
        </div>

        <label>
          Purpose of the reservation
          <textarea
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            placeholder="Type here…"
          />
        </label>

        <div className="buttons-row">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => console.log("Canceled")}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Send Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default RoomBooking;
