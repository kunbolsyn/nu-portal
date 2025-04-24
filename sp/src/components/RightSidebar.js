import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/RightSidebar.css";
import EventDetail from "../components/pages/EventDetail";

const RightSidebar = () => {
  // State for the currently selected date in the calendar
  const [date, setDate] = useState(new Date());
  
  // State for storing upcoming events fetched from API
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  
  // State for tracking which event is selected for the detail view
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  // State for mapping dates to their events (used for calendar indicators)
  const [eventsByDate, setEventsByDate] = useState({});

  // Fetch events when component mounts
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
        
        // Process and sort events
        const processedEvents = data
          .map((item) => ({
            id: item.eventId,
            title: item.eventTitle,
            description: item.description,
            organizer: item.organizer,
            location: item.location || "TBA",
            date: new Date(item.date),
            category: item.category || 'Other',
            image: item.photos_link && item.photos_link !== "string"
              ? item.photos_link
              : `${process.env.PUBLIC_URL}/images/default-event.jpg`,
          }))
          .filter(e => e.date >= now) // Only future events
          .sort((a, b) => a.date - b.date) // Sort chronologically
          .slice(0, 10); // Limit to 10 most immediate events

        // Create events map for calendar indicators (all using NU cyan)
        const eventsMap = {};
        processedEvents.forEach(event => {
          const dateStr = event.date.toDateString();
          if (!eventsMap[dateStr]) {
            eventsMap[dateStr] = [];
          }
          eventsMap[dateStr].push('#4599AD'); // Always use NU cyan
        });

        setEventsByDate(eventsMap);
        setUpcomingEvents(processedEvents);
      })
      .catch((err) => console.error("Error fetching upcoming events:", err));
  }, []);

  // Custom content for calendar tiles (shows event indicators)
  const tileContent = ({ date, view }) => {
    if (view !== 'month') return null;
    
    const dateStr = date.toDateString();
    const events = eventsByDate[dateStr] || [];
    
    return (
      <div className="event-indicators">
        {events.slice(0, 3).map((color, i) => (
          <div 
            key={i} 
            className="event-indicator" 
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    );
  };

  // Groups events by day and creates appropriate labels
  const groupEventsByDay = (events) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const grouped = {};
    events.forEach(event => {
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0);
      const dateStr = eventDate.toDateString();
      
      if (!grouped[dateStr]) {
        let dayLabel;
        if (eventDate.getTime() === today.getTime()) {
          // Format for today: "TODAY 24/11/2023"
          dayLabel = `TODAY ${eventDate.toLocaleDateString('en-GB')}`;
        } else if (eventDate.getTime() === tomorrow.getTime()) {
          // Format for tomorrow: "TOMORROW 25/11/2023"
          dayLabel = `TOMORROW ${eventDate.toLocaleDateString('en-GB')}`;
        } else {
          // Format for other days: "MONDAY 27/11/2023"
          dayLabel = `${eventDate.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase()} ${eventDate.toLocaleDateString('en-GB')}`;
        }
        
        grouped[dateStr] = {
          date: dateStr,
          dayLabel,
          events: []
        };
      }
      grouped[dateStr].events.push(event);
    });

    return Object.values(grouped);
  };

  return (
    <div className="right-sidebar">
      {/* Calendar Section */}
      <div className="calendar-card">
        <Calendar 
          locale="en-US" 
          onChange={setDate} 
          value={date} 
          className="mini-calendar"
          tileContent={tileContent}
          // Fix for circular selection and proper alignment
          tileClassName={({ date, view }) => 
            view === 'month' ? 'calendar-day-tile' : null
          }
        />
      </div>

      {/* Upcoming Events Header */}
      <div className="card-header">
        <i className="fas fa-bell"></i>
        <span>Upcoming Events</span>
      </div>

      {/* Events List */}
      <div className="events-card">
        <ul className="upcoming-list">
          {upcomingEvents.length === 0 ? (
            <li className="no-events">No upcoming events</li>
          ) : (
            groupEventsByDay(upcomingEvents).map((dayGroup) => (
              <React.Fragment key={dayGroup.date}>
                {/* Day Header (TODAY 24/11/2023 format) */}
                <li className="day-header">
                  {dayGroup.dayLabel}
                </li>
                {/* Events for this day */}
                {dayGroup.events.map((evt) => (
                  <li key={evt.id} className="upcoming-item">
                    <div
                      className="upcoming-content"
                      onClick={() => setSelectedEvent(evt)}
                      style={{ borderLeft: `4px solid #4599AD` }} // NU cyan left border
                    >
                      <h5 className="ue-title">{evt.title}</h5>
                      <div className="ue-meta">
                        <i className="fas fa-clock"></i>
                        <span>
                          {evt.date.toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit"
                          })}
                        </span>
                        <i className="fas fa-map-marker-alt"></i>
                        <span>{evt.location}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </React.Fragment>
            ))
          )}
        </ul>
      </div>

      {/* Event Detail Overlay */}
      <EventDetail
        item={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  );
};

export default RightSidebar;