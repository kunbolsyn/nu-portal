import React, { useEffect, useState } from "react";
import "../../styles/EventManagement.css";
import EventModal from "./EventModal";

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrganization, setSelectedOrganization] = useState("All");
  const [sortOption, setSortOption] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [moderationNote, setModerationNote] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("https://senior-project-java-backend.onrender.com/api/events/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch events");
        return res.json();
      })
      .then((data) => {
        const formatted = data.map((item) => ({
          id: item.eventId,
          name: item.eventTitle,
          description: item.description,
          organization: item.club || "Unknown Club",
          room: item.venue?.venueTitle || "TBD",
          date: item.date,
          startTime: item.startTime || "--:--",
          endTime: item.endTime || "--:--",
          status: item.status || "Pending",
          moderationNote: item.moderationNote || "",
          image: item.photos_link || [],
          organizer: item.organizer || "Unknown Organizer",
          capacity: item.venue?.capacity || "N/A",
          location: item.venue?.location || "N/A",
        }));
        setEvents(formatted);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        setEvents([]);
      });
  }, []);

  const filteredEvents = events
    .filter(
      (e) =>
        e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (e) =>
        selectedOrganization === "All" || e.organization === selectedOrganization
    )
    .sort((a, b) => {
      if (sortOption === "venue") return a.room.localeCompare(b.room);
      if (sortOption === "status") return a.status.localeCompare(b.status);
      if (sortOption === "organization") return a.organization.localeCompare(b.organization);
      if (sortOption === "date-asc") return a.date.localeCompare(b.date);
      if (sortOption === "date-desc") return b.date.localeCompare(a.date);
      return 0;
    });

  const handleApprove = () => updateEventStatus("Accepted");
  const handleReject = () => updateEventStatus("Rejected");
  const handlePending = () => {
    updateEventStatus("Pending");
  };
  

  const updateEventStatus = (newStatus) => {
    if (!selectedEvent) return;
    const updated = events.map((e) =>
      e.id === selectedEvent.id ? { ...e, status: newStatus, moderationNote } : e
    );
    setEvents(updated);
    closeModal();
  };

  const openModal = (event) => {
    setSelectedEvent(event);
    setModerationNote(event.moderationNote || "");
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setModerationNote("");
  };

  const uniqueOrganizations = ["All", ...new Set(events.map((e) => e.organization))];

  return (
    <div className="event-management">
      <div className="header-section">
        <h3><i className="fas fa-mail-bulk"></i> Event Requests</h3>
        <div className="event-controls">
          <input
            type="text"
            placeholder="Key words..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select value={selectedOrganization} onChange={(e) => setSelectedOrganization(e.target.value)}>
            {uniqueOrganizations.map((org, i) => (
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
            <th>Organization</th>
            <th>Description</th>
            <th>Venue</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredEvents.map((event, idx) => (
            <tr key={idx} onClick={() => openModal(event)} style={{ cursor: "pointer" }}>
              <td>{event.name}</td>
              <td>{event.id}</td>
              <td>{event.organization}</td>
              <td>{event.description}</td>
              <td>{event.room}</td>
              <td>{event.date}</td>
              <td>{event.startTime}–{event.endTime}</td>
              <td>
                <span className={`status-badge ${event.status.toLowerCase()}`}>
                  {event.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <EventModal
        event={selectedEvent}
        moderationNote={moderationNote}
        onChangeNote={setModerationNote}
        onApprove={handleApprove}
        onReject={handleReject}
        onClose={closeModal}
        onPending={handlePending}
      />
    </div>
  );
};

export default EventManagement;
