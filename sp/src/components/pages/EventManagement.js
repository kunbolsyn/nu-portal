import React, { useState, useEffect } from "react";
import "../../styles/EventManagement.css";
import EventRequestModal from "./EventRequestModal";

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [orgFilter, setOrgFilter] = useState("All");
  const [sortBy, setSortBy] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetch("/data/events.json")
      .then((res) => res.json())
      .then(setEvents)
      .catch((err) => console.error("Failed to fetch events:", err));
  }, []);

  const filtered = events
    .filter((e) =>
      (e.name || "").toLowerCase().includes((search || "").toLowerCase()) ||
      (e.description || "").toLowerCase().includes((search || "").toLowerCase())
    )
    .filter((e) => orgFilter === "All" || e.organization === orgFilter)
    .sort((a, b) => {
      if (sortBy === "date-asc") return (a.date || "").localeCompare(b.date || "");
      if (sortBy === "date-desc") return (b.date || "").localeCompare(a.date || "");
      if (sortBy === "venue") return (a.room || "").localeCompare(b.room || "");
      if (sortBy === "status") return (a.status || "").localeCompare(b.status || "");
      return 0;
    });

  const organizations = [...new Set(events.map((e) => e.organization).filter(Boolean))];

  return (
    <div className="event-management-page">
      <div className="event-management-header">
        <h3>
          <i className="fas fa-calendar-check"></i> Event Requests
        </h3>
        <div className="event-controls">
          <input
            type="text"
            placeholder="🔍 Key words..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={orgFilter} onChange={(e) => setOrgFilter(e.target.value)}>
            <option value="All">Select Organizer</option>
            {organizations.map((org, i) => (
              <option key={i} value={org}>
                {org}
              </option>
            ))}
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="">Sort by</option>
            <option value="venue">Venue</option>
            <option value="status">Status</option>
            <option value="date-asc">Date ↑</option>
            <option value="date-desc">Date ↓</option>
          </select>
        </div>
      </div>

      <table className="event-management-table">
        <thead>
          <tr>
            <th>Event Name</th>
            <th>ID</th>
            <th>Organizer</th>
            <th>Description</th>
            <th>Venue</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((e, idx) => (
            <tr key={idx} className="hover-row" onClick={() => setSelectedEvent(e)}>
              <td>{e.name || "—"}</td>
              <td>{e.id || "—"}</td>
              <td>{e.organization || "—"}</td>
              <td>{e.description || "—"}</td>
              <td>{e.room || "—"}</td>
              <td>{e.date || "—"}</td>
              <td>
                {e.startTime && e.endTime ? `${e.startTime}–${e.endTime}` : "—"}
              </td>
              <td>
                <span className={`status-badge ${e.status?.toLowerCase() || "pending"}`}>
                  {e.status || "Pending"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedEvent && (
        <EventRequestModal
          item={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
};

export default EventManagement;
