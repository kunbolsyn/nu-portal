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

  // Fetch and format events on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("https://senior-project-java-backend.onrender.com/api/events/all", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch events");
        return res.json();
      })
      .then((data) => {
        const formatted = data.map((item) => ({
          eventId: item.eventId,
          eventTitle: item.eventTitle,
          description: item.description,
          organization: item.club || "Unknown Club",
          venue: item.venue?.venueTitle || "TBD",
          date: item.date,
          time: item.time, // Could be string "HH:mm:ss" or object
          type: item.type || "waiting", // Status stored in type
          moderationNote: item.comment || "",
          fullEventData: item,
        }));
        setEvents(formatted);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        setEvents([]);
      });
  }, []);

  // Filter and sort logic
  const filteredEvents = events
    .filter((e) =>
      [e.eventTitle, e.description]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .filter(
      (e) =>
        selectedOrganization === "All" ||
        e.organization === selectedOrganization
    )
    .sort((a, b) => {
      if (sortOption === "venue") return a.venue.localeCompare(b.venue);
      if (sortOption === "status") return a.type.localeCompare(b.type);
      if (sortOption === "organization")
        return a.organization.localeCompare(b.organization);
      if (sortOption === "date-asc") return a.date.localeCompare(b.date);
      if (sortOption === "date-desc") return b.date.localeCompare(a.date);
      return 0;
    });

  // Update event status (type) and comment
  const updateEventStatus = async (newType) => {
    if (!selectedEvent) return;
    const token = localStorage.getItem("token");
    const { fullEventData, eventId } = selectedEvent;

    const payload = {
      ...fullEventData,
      type: newType,
      comment: moderationNote,
    };

    try {
      const response = await fetch(
        `https://senior-project-java-backend.onrender.com/api/events/${eventId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) throw new Error("Failed to update event status");

      setEvents((evts) =>
        evts.map((e) =>
          e.eventId === eventId ? { ...e, type: newType, moderationNote } : e
        )
      );
    } catch (err) {
      console.error("Error updating event:", err);
    } finally {
      closeModal();
    }
  };

  const handleApprove = () => updateEventStatus("accepted");
  const handleReject = () => updateEventStatus("rejected");
  const handlePending = () => updateEventStatus("waiting");

  // Modal control
  const openModal = (e) => {
    setSelectedEvent(e);
    setModerationNote(e.moderationNote || "");
  };
  const closeModal = () => {
    setSelectedEvent(null);
    setModerationNote("");
  };

  const uniqueOrganizations = [
    "All",
    ...new Set(events.map((e) => e.organization)),
  ];

  return (
    <div className="event-management">
      <div className="header-section">
        <h3>
          <i className="fas fa-mail-bulk"></i> Event Requests
        </h3>
        <div className="event-controls">
          <input
            type="text"
            placeholder="Key words..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={selectedOrganization}
            onChange={(e) => setSelectedOrganization(e.target.value)}
          >
            {uniqueOrganizations.map((org, i) => (
              <option key={i} value={org}>
                {org}
              </option>
            ))}
          </select>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
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
          {filteredEvents.map((evt) => {
            // Determine display string for time
            let timeDisplay = "-";
            if (typeof evt.time === "string") {
              timeDisplay = evt.time; // e.g. "14:30:00"
            } else if (evt.time?.hour != null) {
              const h = String(evt.time.hour).padStart(2, "0");
              const m = String(evt.time.minute).padStart(2, "0");
              timeDisplay = `${h}:${m}`;
            }

            return (
              <tr
                key={evt.eventId}
                onClick={() => openModal(evt)}
                style={{ cursor: "pointer" }}
              >
                <td>{evt.eventTitle}</td>
                <td>{evt.eventId}</td>
                <td>{evt.organization}</td>
                <td>{evt.description}</td>
                <td>{evt.venue}</td>
                <td>{evt.date}</td>
                <td>{timeDisplay}</td>
                <td>
                  <span className={`status-badge ${evt.type.toLowerCase()}`}>
                    {evt.type}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <EventModal
        event={selectedEvent}
        moderationNote={moderationNote}
        onChangeNote={setModerationNote}
        onApprove={handleApprove}
        onReject={handleReject}
        onPending={handlePending}
        onClose={closeModal}
      />
    </div>
  );
};

export default EventManagement;
