// src/components/pages/Events.js
import React, { useState, useEffect } from "react";
import "../../styles/Events.css";
import EventDetail from "./EventDetail";
import { demoEvents, isDemoMode } from "../../data/demoData";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const loadEvents = async () => {
      try {
        let data = demoEvents;
        if (!isDemoMode()) {
          const res = await fetch(
            "https://senior-project-java-backend.onrender.com/api/events/all",
            { headers: { Authorization: `Bearer ${token}` } },
          );
          if (!res.ok) throw new Error("Failed to fetch events");
          data = await res.json();
        }
        const acceptedEvents = data.filter((item) => item.type === "accepted");

        const transformed = acceptedEvents.map((item) => ({
          id: item.eventId,
          title: item.eventTitle,
          description: item.description,
          organizer: item.organizer,
          organizerType: item.organizer_type,
          date: item.date,
          time: item.time,
          venue: item.venue?.venueTitle || "Unknown Venue",
          participants: item.participants_number || 0,
          image: item.photo?.filePath
            ? item.photo.filePath
            : `${process.env.PUBLIC_URL}/images/default-event.jpg`,
          qr_code: item.qr_code,
        }));
        setEvents(transformed);
      } catch (err) {
        console.error("Error fetching events:", err);
        setEvents([]); // to avoid endless loading
      }
    };

    loadEvents();
  }, []);

  if (events.length === 0) {
    return <div className="events-page">Loading events...</div>;
  }

  // Date helpers
  const today = new Date();
  const twoWeeksFromNow = new Date();
  twoWeeksFromNow.setDate(today.getDate() + 14);

  // For now, show all upcoming
  const featuredEvents = events.slice(0, 3);
  const upcomingEvents = events;

  return (
    <div className="events-page">
      {/* Featured / Registration Open */}
      {/* <div className="featured-events-section">
        <div className="section-header">
          <i className="fas fa-bolt"></i>
          <h3>Registration Open!</h3>
        </div>
        <div className="featured-events">
          {featuredEvents.map((evt) => (
            <div
              key={evt.id}
              className="featured-event-card"
              onClick={() => setSelectedEvent(evt)}
            >
              <img src={evt.image} alt={evt.title} />
              <div className="event-info">
                <h3>{evt.title}</h3>
                <div className="event-meta-icons">
                  <p>
                    <i className="fas fa-user"></i> {evt.organizer}
                  </p>
                  <p>
                    <i className="fas fa-calendar-alt"></i> {evt.date}
                  </p>
                  <p className="event-venue">
                    <i className="fas fa-map-marker-alt"></i> {evt.venue}
                  </p>
                </div>

                <button className="register-btn">Register</button>
              </div>
            </div>
          ))}
        </div>
      </div> */}

      {/* Upcoming Events */}
      <div className="section-header">
        <i className="fas fa-calendar-alt"></i>
        <h3>Upcoming Events</h3>
      </div>
      <div className="upcoming-events-header">
        <div className="events-filter-bar">
          <select
            value=""
            onChange={(e) => {
              /* you can wire club filtering here */
            }}
          >
            <option value="">All Clubs</option>
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
      <div className="events-grid">
        {upcomingEvents.map((evt) => (
          <div
            key={evt.id}
            className="event-card"
            onClick={() => setSelectedEvent(evt)}
          >
            <img src={evt.image} alt={evt.title} />
            <div className="event-card-body">
              <h4>{evt.title}</h4>
              <div className="event-meta-icons">
                <p>
                  <i className="fas fa-user"></i> {evt.organizer}
                </p>
                <p>
                  <i className="fas fa-calendar-alt"></i> {evt.date}
                </p>
                <p className="event-venue">
                  <i className="fas fa-map-marker-alt"></i> {evt.venue}
                </p>
              </div>

              <p className="event-desc">{evt.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Detail overlay */}
      <EventDetail
        item={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  );
};

export default Events;
