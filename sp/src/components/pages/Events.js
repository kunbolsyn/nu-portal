import React, { useState, useEffect } from "react";
import "../../styles/Events.css";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    fetch("/data/events.json")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  if (events.length === 0) {
    return <div className="events-page">Loading events...</div>;
  }

  // Get today's date and date 2 weeks from now
  const today = new Date();
  const twoWeeksFromNow = new Date();
  twoWeeksFromNow.setDate(today.getDate() + 14);

  // Helper to check if two dates are the same (ignoring time)
  const isSameDay = (d1, d2) =>
    new Date(d1).toDateString() === new Date(d2).toDateString();

  // Featured events: first 3
  const featuredEvents = events.slice(0, 3);

  // Upcoming events: within 2 weeks or match selected date
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
