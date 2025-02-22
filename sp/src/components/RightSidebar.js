import React from 'react';
import "../styles/RightSidebar.css";

const RightSidebar = () => (
  <div className="right-sidebar">
    <h4 className="sidebar-title">February <span className="year">2025</span></h4>
    <div className="calendar-container">
      <img src={`${process.env.PUBLIC_URL}/calendar.png`} alt="Calendar" className="calendar-img" />
    </div>

    <h4 className="events-title">Upcoming Events</h4>
    <ul className="event-list">
      <li>Student Club Event - Tomorrow</li>
      <li>Workshop - Monday</li>
      <li>Guest Lecture - Wednesday</li>
    </ul>
  </div>
);

export default RightSidebar;
