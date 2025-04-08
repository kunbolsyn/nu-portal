import React from "react";
import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const location = useLocation(); // Get current route

  return (
    <div className="sidebar">
      {/* Full NU Logo (Icon + Text) */}
      <div className="sidebar-logo">
        <img src={`${process.env.PUBLIC_URL}/NU-logo.png`} alt="NU Logo" className="full-logo" />
      </div>

      {/* Sidebar Navigation */}
      <Nav className="flex-column">
        <Nav.Link as={Link} to="/dashboard" className={location.pathname === "/dashboard" ? "active" : ""}>
          <i className="fas fa-home"></i> Dashboard
        </Nav.Link>
        <Nav.Link as={Link} to="/news" className={location.pathname === "/news" ? "active" : ""}>
          <i className="fas fa-newspaper"></i> News
        </Nav.Link>
        <Nav.Link as={Link} to="/events" className={location.pathname === "/events" ? "active" : ""}>
          <i className="fas fa-calendar-alt"></i> Events
        </Nav.Link>
        <Nav.Link as={Link} to="/calendar" className={location.pathname === "/calendar" ? "active" : ""}>
          <i className="fas fa-calendar"></i> Calendar
        </Nav.Link>
        <Nav.Link as={Link} to="/phonebook" className={location.pathname === "/phonebook" ? "active" : ""}>
          <i className="fas fa-address-book"></i> Phonebook
        </Nav.Link>
        <Nav.Link as={Link} to="/studentclubs" className={location.pathname === "/studentclubs" ? "active" : ""}>
          <i className="fas fa-users"></i> Student Clubs
        </Nav.Link>

        <Nav.Link as={Link} to="/mypage" className={location.pathname === "/mypage" ? "active" : ""}>
          <i className="fas fa-user"></i> My Page
        </Nav.Link>

        <hr />

        <Nav.Link as={Link} to="/event-planning" className={location.pathname === "/event-planning" ? "active" : ""}>
          <i className="fas fa-tasks"></i> Event Planning
        </Nav.Link>
        <Nav.Link as={Link} to="/suggest-news" className={location.pathname === "/suggest-news" ? "active" : ""}>
          <i className="fas fa-edit"></i> Suggest News
        </Nav.Link>

        <hr />

        <Nav.Link as={Link} to="/settings" className={location.pathname === "/settings" ? "active" : ""}>
          <i className="fas fa-cog"></i> Settings
        </Nav.Link>
        <Nav.Link as={Link} to="/" className="logout">
          <i className="fas fa-sign-out-alt"></i> Logout
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
