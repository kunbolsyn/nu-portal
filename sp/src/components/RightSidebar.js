import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/RightSidebar.css";
import EventDetail from "../components/pages/EventDetail"; // ✅ if it's directly under /pages

const RightSidebar = () => {
  const [date, setDate] = useState(new Date());
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null); // ✅

  useEffect(() => {
    fetch("/data/events.json")
      .then((res) => res.json())
      .then((events) => {
        const now = new Date();
        const twoWeeksFromNow = new Date(now);
        twoWeeksFromNow.setDate(now.getDate() + 14);

        const filtered = events.filter((event) => {
          const eventDate = new Date(event.date);
          return eventDate >= now && eventDate <= twoWeeksFromNow;
        });

        setUpcomingEvents(filtered);
      })
      .catch((err) => console.error("Error loading events:", err));
  }, []);

  const goToEvent = (event) => {
    setSelectedEvent(event);
  };

  return (
    <div className="right-sidebar">
      <h4 className="sidebar-title">
        {date.toLocaleString("default", { month: "long" })}{" "}
        <span className="year">{date.getFullYear()}</span>
      </h4>

      <div className="calendar-container">
        <Calendar onChange={setDate} value={date} className="mini-calendar" />
      </div>

      <h4 className="events-title">Upcoming Events</h4>
      <ul className="event-list">
        {upcomingEvents.length === 0 ? (
          <li>No upcoming events</li>
        ) : (
          upcomingEvents.map((event, idx) => (
            <li key={idx}>
              <button className="event-link" onClick={() => goToEvent(event)}>
                {event.title}
                <br />
                {new Date(event.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </button>
            </li>
          ))
        )}
      </ul>

      <EventDetail
        item={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  );
};

export default RightSidebar;
