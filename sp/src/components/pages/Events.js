import React, { useState, useEffect } from "react";
import "../../styles/Events.css";
import EventDetail from "./EventDetail";
import { useLocation, useNavigate } from "react-router-dom";

const Events = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(
    location.state?.selectedEvent || null
  );
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    fetch("/data/events.json")
      .then((res) => res.json())
      .then(setEvents)
      .catch(console.error);
  }, []);

  // 2) Whenever location.state.selectedEvent changes, update local state
  useEffect(() => {
    if (location.state?.selectedEvent) {
      setSelectedEvent(location.state.selectedEvent);
    }
  }, [location.state]);

  // 3) Helper: clear both local and navigation state on close
  const closeOverlay = () => {
    setSelectedEvent(null);
    // Replace entry to clear out location.state without changing URL
    navigate(location.pathname, { replace: true, state: {} });
  };

  if (!events.length) {
    return <div className="events-page">Loading events...</div>;
  }
  const today = new Date();
  const twoWeeksFromNow = new Date();
  twoWeeksFromNow.setDate(today.getDate() + 14);

  const isSameDay = (d1, d2) =>
    new Date(d1).toDateString() === new Date(d2).toDateString();

  const featuredEvents = events.slice(0, 3);

  const upcomingEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    if (selectedDate) {
      return isSameDay(eventDate, new Date(selectedDate));
    }
    return eventDate >= today && eventDate <= twoWeeksFromNow;
  });

  return (
    <div className="events-page">
      {/* Featured Events Section */}
      <div className="featured-events-section">
        <h2>
          <i className="fas fa-bolt"></i> Registration Open!
        </h2>
        <div className="featured-events">
          {featuredEvents.map((event, idx) => (
            <div
              key={idx}
              className="featured-event-card"
              onClick={() => setSelectedEvent(event)}
              style={{ cursor: "pointer" }}
            >
              <img src={event.image} alt={event.title} />
              <div className="event-info">
                <h3>{event.title}</h3>
                <div className="event-meta-icons">
                  <p>
                    <i className="fas fa-user"></i> {event.organizer}
                  </p>
                  <p>
                    <i className="fas fa-calendar-alt"></i> {event.date}
                  </p>
                </div>
                <button className="register-btn">Register</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Events Section */}
      <div className="upcoming-events-header">
        <h2>
          <i className="fas fa-calendar-alt"></i> Upcoming Events
        </h2>
        <div className="events-filter-bar">
          <select>
            <option value="">Select clubs</option>
            <option value="Film Club">Film Club</option>
            <option value="Tech Club">Tech Club</option>
            <option value="Business Club">Business Club</option>
            <option value="Music Club">Music Club</option>
          </select>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      </div>

      {/* Upcoming Events Grid */}
      <div className="events-grid">
        {upcomingEvents.map((event, idx) => (
          <div
            key={idx}
            className="event-card"
            onClick={() => setSelectedEvent(event)}
            style={{ cursor: "pointer" }}
          >
            <img src={event.image} alt={event.title} />
            <div className="event-card-body">
              <h4>{event.title}</h4>
              <div className="event-meta-icons">
                <p>
                  <i className="fas fa-user"></i> {event.organizer}
                </p>
                <p>
                  <i className="fas fa-calendar-alt"></i> {event.date}
                </p>
              </div>
              <p className="event-desc">{event.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Overlay (reusable) */}
      <EventDetail
        item={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  );
};

export default Events;
