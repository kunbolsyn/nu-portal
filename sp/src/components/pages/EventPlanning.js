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
  const [existingEvents, setExistingEvents] = useState([]);
  const [submittedEvents, setSubmittedEvents] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClub, setSelectedClub] = useState("All");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    fetch("/data/venues.json").then((res) => res.json()).then(setVenues);
    fetch("/data/organizations.json").then((res) => res.json()).then(setOrganizations);
    fetch("/data/events.json").then(res => res.json()).then(setExistingEvents);
  }, []);

  useEffect(() => {
    if (!room || !date || !startTime || !endTime) {
      setAvailability("Unavailable");
      return;
    }
  
    const isConflict = existingEvents.some(event => {
      // Direct string comparison, now both are in YYYY-MM-DD format
      if (event.venue !== room || event.date !== date) return false;
      return !(endTime <= event.startTime || startTime >= event.endTime);
    });
  
    setAvailability(isConflict ? "Unavailable" : "Available");
  }, [room, date, startTime, endTime, existingEvents]);
  
  

  

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
    if (!eventName || !organization || !room || !date) {
      alert("Please fill in all required fields.");
      return;
    }

    const newEvent = {
      id: (submittedEvents.length + 1).toString().padStart(5, "0"),
      name: eventName,
      description,
      organization,
      date,
      startTime,
      endTime,
      room,
      technicalEquipment,
      status: "Pending",
    };

    setSubmittedEvents([...submittedEvents, newEvent]);
    alert("Request sent successfully!");
    handleClear();
  };

  const addContactPerson = () => {
    if (!personInput.name || !personInput.phone || !personInput.id) return;
    setContactPersons([...contactPersons, personInput]);
    setPersonInput({ name: "", phone: "", id: "" });
  };

  const addEquipment = () => {
    if (!equipmentInput.category || Number(equipmentInput.amount) < 1) return;
    setTechnicalEquipment([...technicalEquipment, equipmentInput]);
    setEquipmentInput({ category: "", amount: "", comments: "" });
  };

  const filteredEvents = submittedEvents
  .filter(e =>
    (e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.description.toLowerCase().includes(searchTerm.toLowerCase()))
  )
  .filter(e =>
    selectedClub === "All" || e.organization === selectedClub
  )
  .sort((a, b) => {
    if (sortOption === "venue") return a.room.localeCompare(b.room);
    if (sortOption === "status") return a.status.localeCompare(b.status);
    if (sortOption === "organization") return a.organization.localeCompare(b.organization);
    if (sortOption === "date-asc") return a.date.localeCompare(b.date);
    if (sortOption === "date-desc") return b.date.localeCompare(a.date);
    return 0;
  });

  return (
    <div className="event-planning-container">
      <h2><i className="fas fa-calendar-plus"></i> Create Event</h2>
      <div className="event-form">
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

        <label>Event Name</label>
        <input
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />

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
                type="number"
                placeholder="Telephone Number"
                value={personInput.phone}
                onChange={(e) => setPersonInput({ ...personInput, phone: e.target.value })}
              />
              <input
                type="number"
                placeholder="ID Number"
                value={personInput.id}
                onChange={(e) => setPersonInput({ ...personInput, id: e.target.value })}
              />
              <button className="add-person-btn" onClick={addContactPerson}>Add Person</button>
            </div>
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

        <label>Required Inventory (Furniture)</label>
        <textarea
          placeholder="Type here..."
          value={inventory}
          onChange={(e) => setInventory(e.target.value)}
        />

        <label>Technical Equipment</label>
        <div className="event-row contact-inputs">
          <input
            list="equipment-options"
            placeholder="Category"
            value={equipmentInput.category}
            onChange={(e) => setEquipmentInput({ ...equipmentInput, category: e.target.value })}
          />
          <datalist id="equipment-options">
            <option value="Projector" />
            <option value="Projector Screen" />
            <option value="Presenter" />
            <option value="Microphone" />
            <option value="Acoustic System" />
          </datalist>
          <input
            type="number"
            placeholder="Amount"
            min="1"
            value={equipmentInput.amount}
            onChange={(e) => setEquipmentInput({ ...equipmentInput, amount: e.target.value })}
          />
          <input
            type="text"
            placeholder="Comments..."
            value={equipmentInput.comments}
            onChange={(e) => setEquipmentInput({ ...equipmentInput, comments: e.target.value })}
          />
        </div>
        <div className="equipment-button-wrapper">
          <button className="add-person-btn" onClick={addEquipment}>Add Equipment</button>
        </div>

        {technicalEquipment.map((item, i) => (
          <div key={i} className="equipment-item">
            {item.category} — {item.amount} {item.amount > 1 ? "items" : "item"}
            {item.comments ? ` (${item.comments})` : ""}
          </div>
        ))}

        <label>Additional Comments</label>
        <textarea
          className="additional-comments"
          placeholder="Write here..."
          value={additionalComments}
          onChange={(e) => setAdditionalComments(e.target.value)}
        />

        
<div className="file-action-row">
  <button className="attach-btn" onClick={() => fileInputRef.current.click()}>Attach files</button>
  <button className="clear-btn" onClick={handleClear}>Clear</button>
  <button className="submit-btn" onClick={handleSubmit}>Send a request</button>
  <input
    type="file"
    ref={fileInputRef}
    multiple
    onChange={handleFileChange}
    style={{ display: "none" }}
  />
</div>


        {attachedFiles.length > 0 && (
          <ul className="attached-files">
            {attachedFiles.map((file, i) => (
              <li key={i}>{file.name}</li>
            ))}
          </ul>
        )}


      </div>

     {/* === MY EVENTS SECTION === */}
     <div className="my-events-section">
        <div className="my-events-header">
          <h3><i className="fas fa-calendar-alt"></i> My Events</h3>
          <div className="event-controls">
            <input
              type="text"
              placeholder="🔍 Key words..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select value={selectedClub} onChange={(e) => setSelectedClub(e.target.value)}>
              <option value="All">Select Clubs</option>
              {organizations.map((org, i) => (
                <option key={i} value={org}>{org}</option>
              ))}
            </select>
            <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
              <option value="">Sort by</option>
              <option value="venue">Venue</option>
              <option value="status">Status</option>
              <option value="organization">Organization</option>
              <option value="date-asc">Date ↑</option>
              <option value="date-desc">Date ↓</option>
            </select>
          </div>
        </div>

        <table className="event-table">
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Event ID</th>
              <th>Description</th>
              <th>Organization</th>
              <th>Date</th>
              <th>Time</th>
              <th>Room</th>
              <th>Equipment</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.map((event, idx) => (
              <tr key={idx}>
                <td>{event.name}</td>
                <td>{event.id}</td>
                <td>{event.description}</td>
                <td>{event.organization}</td>
                <td>{event.date}</td>
                <td>{event.startTime}–{event.endTime}</td>
                <td>{event.room}</td>
                <td>
                  {event.technicalEquipment?.map((eq, i) => (
                    <div key={i}>
                      {eq.category} ({eq.amount}){eq.comments ? ` - ${eq.comments}` : ""}
                    </div>
                  ))}
                </td>
                <td>
                  <span className={`status-badge ${event.status.toLowerCase()}`}>
                    {event.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>



  );
};

export default EventPlanning;
