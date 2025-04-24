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
        const now = new Date();
        const inTwoWeeks = new Date();
        inTwoWeeks.setDate(now.getDate() + 54);
      
        const upcoming = data
          .map((item) => ({
            id: item.eventId,
            title: item.eventTitle,
            description: item.description,
            organizer: item.organizer,
            date: item.date,
            image: item.photo?.filePath
              ? item.photo.filePath
              : `${process.env.PUBLIC_URL}/images/default-event.jpg`,
          }))
          .filter((e) => {
            const eventDate = new Date(e.date);
            return eventDate >= now && eventDate <= inTwoWeeks;
          })
          .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by date ascending
      
        setUpcomingEvents(upcoming);
      })
      .catch((err) => console.error("Error fetching upcoming events:", err));
  }, []);

  return (
    <div className="right-sidebar">
      <div className="calendar-card">
        <Calendar
          locale="en-US"
          onChange={setDate}
          value={date}
          className="mini-calendar"
          tileContent={({ date, view }) =>
            view === "month" &&
            upcomingEvents.some(
              (evt) => new Date(evt.date).toDateString() === date.toDateString()
            ) ? (
              <div className="event-indicator"></div>
            ) : null
          }
        />
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