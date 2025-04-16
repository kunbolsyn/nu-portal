import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/RightSidebar.css";

const RightSidebar = () => {
  const [date, setDate] = useState(new Date());
  const [upcomingEvents, setUpcomingEvents] = useState([]);

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
          upcomingEvents.map((event, index) => (
            <li key={index}>
              <a href={`/events`} className="event-link">
                {event.title}
                <br />
                {new Date(event.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric", 
                  year: "numeric",
                })}
              </a>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default RightSidebar;
