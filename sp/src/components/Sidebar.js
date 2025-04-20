import React from "react";
import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "../styles/Sidebar.css";

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const userRole = localStorage.getItem("userRole");

  const isActive = (path) => (location.pathname === path ? "active" : "");

  return (
    <div className={`sidebar ${isOpen ? "open-mobile" : ""}`}>
      <div className="sidebar-header">
        <Link to="/dashboard" className="sidebar-logo">
          <img
            src={`${process.env.PUBLIC_URL}/NU-logo.png`}
            alt="NU Logo"
            className="full-logo"
          />
        </Link>
        <div className="close-sidebar-btn">
          <i className="fas fa-times close-sidebar-icon" onClick={onClose}></i>
        </div>
      </div>

      <Nav className="flex-column">
        <Nav.Link
          as={Link}
          to="/dashboard"
          className={isActive("/dashboard")}
          onClick={onClose}
        >
          <i className="fas fa-home"></i> Dashboard
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/news"
          className={isActive("/news")}
          onClick={onClose}
        >
          <i className="fas fa-newspaper"></i> News
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/events"
          className={isActive("/events")}
          onClick={onClose}
        >
          <i className="fas fa-calendar-alt"></i> Events
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/calendar"
          className={isActive("/calendar")}
          onClick={onClose}
        >
          <i className="fas fa-calendar"></i> Calendar
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/phonebook"
          className={isActive("/phonebook")}
          onClick={onClose}
        >
          <i className="fas fa-address-book"></i> Phonebook
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/studentclubs"
          className={isActive("/studentclubs")}
          onClick={onClose}
        >
          <i className="fas fa-users"></i> Student Clubs
        </Nav.Link>

        <hr />
        <Nav.Link
          as={Link}
          to="/requests"
          className={isActive("/requests")}
          onClick={onClose}
        >
          <i className="fas fa-file-alt"></i> Requests
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/payments"
          className={isActive("/payments")}
          onClick={onClose}
        >
          <i className="fas fa-credit-card"></i> Payments
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/booking"
          className={isActive("/booking")}
          onClick={onClose}
        >
          <i className="fas fa-door-open"></i> Room Booking
        </Nav.Link>
        <hr />

        {userRole !== "staff" && (
          <Nav.Link
            as={Link}
            to="/event-planning"
            className={isActive("/event-planning")}
            onClick={onClose}
          >
            <i className="fas fa-tasks"></i> Event Planning
          </Nav.Link>
        )}
        {userRole === "student" && (
          <Nav.Link
            as={Link}
            to="/suggest-news"
            className={isActive("/suggest-news")}
            onClick={onClose}
          >
            <i className="fas fa-edit"></i> Suggest News
          </Nav.Link>
        )}
      </Nav>
    </div>
  );
};

export default Sidebar;
