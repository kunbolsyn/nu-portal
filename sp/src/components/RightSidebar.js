import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/RightSidebar.css";
import EventDetail from "../components/pages/EventDetail";

const RightSidebar = () => {
  const [date, setDate] = useState(new Date());
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetch("/data/events.json")
      .then((res) => res.json())
      .then((events) => {
        const now = new Date();
        const inTwoWeeks = new Date(now);
        inTwoWeeks.setDate(now.getDate() + 14);
        setUpcomingEvents(
          events.filter((e) => {
            const d = new Date(e.date);
            return d >= now && d <= inTwoWeeks;
          })
        );
      })
      .catch(console.error);
  }, []);

  return (
    <div className="right-sidebar">
      <div className="calendar-card">
        <Calendar onChange={setDate} value={date} className="mini-calendar" />
      </div>

      <div className="card-header">
        <i className="fas fa-bell"></i>
        <span>Upcoming Events</span>
      </div>

      <div className="events-card">
        <ul className="upcoming-list">
          {upcomingEvents.length === 0 ? (
            <li className="no-events">No upcoming events</li>
          ) : (
            upcomingEvents.map((evt, i) => (
              <li key={i} className="upcoming-item">
                <div
                  className="upcoming-content"
                  onClick={() => setSelectedEvent(evt)}
                >
                  <h5 className="ue-title">{evt.title}</h5>
                  <div className="ue-meta">
                    <i className="fas fa-calendar-check"></i>
                    <span>
                      {new Date(evt.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Overlay Detail */}
      <EventDetail
        item={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  );
};

export default RightSidebar;
