// src/components/pages/Events.js
import React, { useState, useEffect } from "react";
import "../../styles/Events.css";
import EventDetail from "./EventDetail";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");

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
        const transformed = data.map((item) => ({
          id: item.eventId,
          title: item.eventTitle,
          description: item.description,
          organizer: item.organizer,
          date: item.date,
          image:
            item.photos_link.length > 0
              ? item.photos_link
              : "images/default-event.jpg",
        }));
        setEvents(transformed);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        setEvents([]); // to avoid endless loading
      });
  }, []);

  if (events.length === 0) {
    return <div className="events-page">Loading events...</div>;
  }

  // Date helpers
  const today = new Date();
  const twoWeeksFromNow = new Date();
  twoWeeksFromNow.setDate(today.getDate() + 14);

  // Split into featured and upcoming
  const featuredEvents = events.slice(0, 3);
  const upcomingEvents = events;
  // const upcomingEvents = events.filter((evt) => {
  //   const ed = new Date(evt.date);
  //   if (selectedDate) {
  //     return isSameDay(ed, new Date(selectedDate));
  //   }
  //   return ed >= today && ed <= twoWeeksFromNow;
  // });

  return (
    <div className="events-page">
      {/* Featured / Registration Open */}
      <div className="featured-events-section">
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
                </div>
                <button className="register-btn">Register</button>
              </div>
            </div>
          ))}
        </div>
      </div>

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
              </div>
              {/* You can hide the description on featured */}
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
