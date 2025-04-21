import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import "../../styles/Calendar.css";
import EventDetail from "../pages/EventDetail";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetch("/data/events.json")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  const year = currentMonth.year();
  const month = currentMonth.month();
  const startOfMonth = dayjs(new Date(year, month, 1));
  const daysInMonth = startOfMonth.daysInMonth();
  const startDayOfWeek = startOfMonth.day();

  // build calendar cells
  const calendarCells = [];
  for (let i = 0; i < startDayOfWeek; i++) calendarCells.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarCells.push(d);
  while (calendarCells.length < 42) calendarCells.push(null);

  // events for a given day
  const getEventsForDay = (dayNumber) => {
    if (!dayNumber) return [];
    const cellDate = dayjs(new Date(year, month, dayNumber));
    return events.filter((evt) => dayjs(evt.date).isSame(cellDate, "day"));
  };

  const goToPreviousMonth = () =>
    setCurrentMonth(currentMonth.subtract(1, "month"));
  const goToNextMonth = () => setCurrentMonth(currentMonth.add(1, "month"));

  return (
    <div className="calendar-page">
      {/* header/nav */}
      <div className="calendar-header">
        <button onClick={goToPreviousMonth} className="nav-arrow">
          <i className="fas fa-chevron-left"></i>
        </button>
        <h2>
          <i className="fas fa-calendar-alt"></i>{" "}
          {currentMonth.format("MMMM, YYYY")}
        </h2>
        <button onClick={goToNextMonth} className="nav-arrow">
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>

      {/* day labels */}
      <div className="calendar-grid day-labels">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* days */}
      <div className="calendar-grid calendar-days">
        {calendarCells.map((dayNumber, idx) => {
          const dayEvents = getEventsForDay(dayNumber);
          return (
            <div key={idx} className="calendar-cell">
              {dayNumber && <div className="day-number">{dayNumber}</div>}
              {dayEvents.map((evt, i) => (
                <button
                  key={i}
                  className="event-tag clickable"
                  title={evt.title}
                  onClick={() => setSelectedEvent(evt)}
                >
                  {evt.title}
                </button>
              ))}
            </div>
          );
        })}
      </div>

      {/* Reusable detail overlay */}
      <EventDetail
        item={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  );
};

export default Calendar;
