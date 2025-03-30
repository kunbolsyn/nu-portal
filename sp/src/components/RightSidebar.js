import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/RightSidebar.css"; // our custom styles

const RightSidebar = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="right-sidebar">
      {/* Sidebar Title with Month & Year */}
      <h4 className="sidebar-title">
        {date.toLocaleString("default", { month: "long" })}{" "}
        <span className="year">{date.getFullYear()}</span>
      </h4>

      {/* Real Calendar */}
      <div className="calendar-container">
        <Calendar onChange={setDate} value={date} className="mini-calendar" />
      </div>

      {/* Upcoming Events */}
      <h4 className="events-title">Upcoming Events</h4>
      <ul className="event-list">
        <li>Student Club Event - Tomorrow</li>
        <li>Workshop - Monday</li>
        <li>Guest Lecture - Wednesday</li>
      </ul>
    </div>
  );
};

export default RightSidebar;
