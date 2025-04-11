import React, { useState, useEffect } from "react";
import "../../styles/Events.css";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/data/events.json")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  if (events.length === 0) {
    return <div className="events-page">Loading events...</div>;
  }

  // Featured events: first 3
  const featuredEvents = events.slice(0, 3);
  // Upcoming events: the rest
  const upcomingEvents = events.slice(3);

  return (
    <div className="events-page">
      {/* Featured Events Section */}
      <div className="featured-events-section">
        <h2>
          <i className="fas fa-bolt"></i> Registration Open!
        </h2>
        <div className="featured-events">
          {featuredEvents.map((event, index) => (
            <div key={index} className="featured-event-card">
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
                {/* Register button pinned to bottom */}
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
          <input type="date" />
        </div>
      </div>

      {/* Upcoming Events Grid */}
      <div className="events-grid">
        {upcomingEvents.map((event, index) => (
          <div key={index} className="event-card">
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
    </div>
  );
};

export default Events;
