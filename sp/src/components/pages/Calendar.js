import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import "../../styles/Calendar.css";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [events, setEvents] = useState([]);

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

  // Build 42 cells
  const calendarCells = [];
  for (let i = 0; i < startDayOfWeek; i++) {
    calendarCells.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    calendarCells.push(d);
  }
  while (calendarCells.length < 42) {
    calendarCells.push(null);
  }

  const getEventsForDay = (dayNumber) => {
    if (!dayNumber) return [];
    const cellDate = dayjs(new Date(year, month, dayNumber));
    return events.filter((evt) => {
      const evtDate = dayjs(evt.date);
      return evtDate.isSame(cellDate, "day");
    });
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, "month"));
  };

  const goToNextMonth = () => {
    setCurrentMonth(currentMonth.add(1, "month"));
  };

  // Handle click on event
  const handleEventClick = (event) => {
    alert(`Event: ${event.title}\nDate: ${event.date}`);
    // Or navigate, or open modal, etc.
  };

  return (
    <div className="calendar-page">
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

      {/* Day-of-week headers */}
      <div className="calendar-grid day-labels">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>

      {/* Calendar cells */}
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
                  onClick={() => handleEventClick(evt)}
                >
                  {evt.title}
                </button>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
