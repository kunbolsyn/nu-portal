import React, { useState, useEffect, useRef } from "react";
import "../../styles/EventPlanning.css";

const EventPlanning = () => {
  const [organization, setOrganization] = useState("");
  const [eventName, setEventName] = useState("");
  const [room, setRoom] = useState("");
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
  const [attachedFiles, setAttachedFiles] = useState([]);
  const fileInputRef = useRef(null);

  const [venues, setVenues] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [availability, setAvailability] = useState("Available");

  useEffect(() => {
    fetch("/data/venues.json").then((res) => res.json()).then(setVenues);
    fetch("/data/organizations.json").then((res) => res.json()).then(setOrganizations);
  }, []);

  useEffect(() => {
    if (room && date && startTime && endTime) {
      setAvailability("Available");
    } else {
      setAvailability("Unavailable");
    }
  }, [room, date, startTime, endTime]);

  const handleFileChange = (e) => {
    setAttachedFiles([...attachedFiles, ...Array.from(e.target.files)]);
  };

  const handleClear = () => {
    if (!window.confirm("Are you sure you want to clear the form?")) return;
    setOrganization("");
    setEventName("");
    setRoom("");
    setDate("");
    setStartTime("00:00");
    setEndTime("00:00");
    setDescription("");
    setInventory("");
    setContactPersons([]);
    setPersonInput({ name: "", phone: "", id: "" });
    setTechnicalEquipment([]);
    setEquipmentInput({ category: "", amount: "", comments: "" });
    setAdditionalComments("");
    setAttachedFiles([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = () => {
    alert("Request sent successfully!");
    handleClear();
  };

  const addContactPerson = () => {
    if (!personInput.name || !personInput.phone || !personInput.id) return;
    setContactPersons([...contactPersons, personInput]);
    setPersonInput({ name: "", phone: "", id: "" });
  };

  const addEquipment = () => {
    if (!equipmentInput.category || !equipmentInput.amount) return;
    setTechnicalEquipment([...technicalEquipment, equipmentInput]);
    setEquipmentInput({ category: "", amount: "", comments: "" });
  };

  return (
    <div className="event-planning-container">
      <h2><i className="fas fa-calendar-plus"></i> Create Event</h2>
      <div className="event-form">
        {/* Organization */}
        <label>Organization name</label>
        <input
          list="organization-options"
          placeholder="Search organization..."
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
        />
        <datalist id="organization-options">
          {organizations.map((org, idx) => (
            <option key={idx} value={org} />
          ))}
        </datalist>

        {/* Event Name */}
        <label>Event Name</label>
        <input
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />

        {/* Venue, Date, Time */}
        <div className="event-row">
          <div>
            <label>Venue</label>
            <input
              list="venue-options"
              placeholder="Search venue..."
              value={room}
              onChange={(e) => setRoom(e.target.value)}
            />
            <datalist id="venue-options">
              {venues.map((venue, idx) => (
                <option key={idx} value={venue} />
              ))}
            </datalist>
          </div>
          <div>
            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
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

        <p>
          <strong>Status:</strong>{" "}
          <span style={{ color: availability === "Available" ? "green" : "red" }}>
            {availability}
          </span>
        </p>

        {/* Description & Contact section */}
        <div className="event-row">
          <div className="description-block">
            <label>Short Description of Event</label>
            <textarea
              placeholder="Type here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="contact-block">
            <label>Contact Information of Responsible People</label>
            <div className="event-row contact-inputs">
              <input
                type="text"
                placeholder="Name Surname"
                value={personInput.name}
                onChange={(e) => setPersonInput({ ...personInput, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Telephone Number"
                value={personInput.phone}
                onChange={(e) => setPersonInput({ ...personInput, phone: e.target.value })}
              />
              <input
                type="text"
                placeholder="ID Number"
                value={personInput.id}
                onChange={(e) => setPersonInput({ ...personInput, id: e.target.value })}
              />
            </div>
            <button className="add-person-btn" onClick={addContactPerson}>Add Person</button>

            {contactPersons.length > 0 && (
              <div className="contact-list">
                {contactPersons.map((person, i) => (
                  <div key={i} className="contact-item">
                    <div>{person.name}</div>
                    <div>{person.phone}</div>
                    <div>{person.id}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Inventory */}
        <label>Required Inventory (Furniture)</label>
        <textarea
          placeholder="Type here..."
          value={inventory}
          onChange={(e) => setInventory(e.target.value)}
        />

        {/* Technical Equipment */}
        <label>Technical Equipment</label>
        <div className="event-row">
          <select
            value={equipmentInput.category}
            onChange={(e) => setEquipmentInput({ ...equipmentInput, category: e.target.value })}
          >
            <option value="">Category</option>
            <option>Projector</option>
            <option>Projector Screen</option>
            <option>Presenter</option>
            <option>Microphone</option>
            <option>Acoustic System</option>
          </select>
          <input
            type="number"
            placeholder="Amount"
            value={equipmentInput.amount}
            onChange={(e) => setEquipmentInput({ ...equipmentInput, amount: e.target.value })}
          />
          <input
            type="text"
            placeholder="Comments..."
            value={equipmentInput.comments}
            onChange={(e) => setEquipmentInput({ ...equipmentInput, comments: e.target.value })}
          />
          <button className="submit-btn" onClick={addEquipment}>Add Equipment</button>
        </div>

        {technicalEquipment.map((item, i) => (
          <div key={i} style={{ fontSize: "0.9rem" }}>
            {item.category} — {item.amount} pcs ({item.comments})
          </div>
        ))}

        {/* Additional Comments */}
        <label>Additional Comments</label>
        <textarea
          placeholder="Write here..."
          value={additionalComments}
          onChange={(e) => setAdditionalComments(e.target.value)}
        />

        {/* Attachments */}
        <label className="attach-label">Attach files</label>
        <input
          type="file"
          ref={fileInputRef}
          multiple
          onChange={handleFileChange}
        />
        <ul>
          {attachedFiles.map((file, i) => (
            <li key={i}>{file.name}</li>
          ))}
        </ul>

        {/* Buttons */}
        <div className="event-buttons">
          <button onClick={handleClear} className="clear-btn">Clear</button>
          <button onClick={handleSubmit} className="submit-btn">Send a request</button>
        </div>
      </div>
    </div>
  );
};

export default EventPlanning;
