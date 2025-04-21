import React from "react";
import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "../styles/LeftSidebar.css";

const LeftSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const userRole = localStorage.getItem("userRole");

  const isActive = (path) => (location.pathname === path ? "active" : "");

  return (
    <div className={`left-sidebar ${isOpen ? "open-mobile" : ""}`}>
      <div className="left-sidebar-header">
        <Link to="/dashboard" className="left-sidebar-logo">
          <img
            src={`${process.env.PUBLIC_URL}/NU-logo.png`}
            alt="NU Logo"
            className="full-logo"
          />
        </Link>
        <div className="close-left-sidebar-btn">
          <i className="fas fa-bars close-left-sidebar-icon" onClick={onClose}></i>
        </div>
      </div>


      <hr />
      <Nav className="flex-column">
        <Nav.Link
          as={Link}
          to="/dashboard"
          className={isActive("/dashboard")}
          onClick={onClose}
        >
          <i className="fas fa-home"></i> Dashboard
        </Nav.Link>

{/*///////////////////////////////////////////////////////////////////////////////////*/}
        <hr />
        <Nav.Link
          as={Link}
          to="/news"
          className={isActive("/news")}
          onClick={onClose}
        >
          <i className="fas fa-newspaper"></i> University News
        </Nav.Link>


        <Nav.Link
          as={Link}
          to="/events"
          className={isActive("/events")}
          onClick={onClose}
        >
          <i className="fas fa-clock"></i> Campus Events
        </Nav.Link>


        <Nav.Link
          as={Link}
          to="/calendar"
          className={isActive("/calendar")}
          onClick={onClose}
        >
          <i className="fas fa-calendar-alt"></i> Event Calendar
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
          to="/infocenter"
          className={isActive("/infocenter")}
          onClick={onClose}
        >
          <i className="fas fa-university"></i> Infocenter
        </Nav.Link>

{/*///////////////////////////////////////////////////////////////////////////////////*/}
        <hr />
        {userRole === "student" && (
          <Nav.Link
            as={Link}
            to="/studentclubs"
            className={isActive("/studentclubs")}
            onClick={onClose}
          >
            <i className="fas fa-users"></i> Student Clubs
          </Nav.Link>
        )}


        {userRole === "usm" && (
          <Nav.Link
            as={Link}
            to="/request-management"
            className={isActive("/request-management")}
            onClick={onClose}
          >
            <i className="fas fa-vote-yea"></i> Request Management
          </Nav.Link>
        )}


        {userRole !== "dss" && (
          <Nav.Link
            as={Link}
            to="/suggest-news"
            className={isActive("/suggest-news")}
            onClick={onClose}
          >
            <i className="fas fa-keyboard"></i> Suggest News
          </Nav.Link>
        )}


        {userRole === "dss" && (
          <Nav.Link
            as={Link}
            to="/event-management"
            className={isActive("/event-management")}
            onClick={onClose}
          >
            <i className="fas fa-mail-bulk"></i> Event Management
          </Nav.Link>
        )}


        {userRole === "dss" && (
          <Nav.Link
            as={Link}
            to="/news-moderation"
            className={isActive("/news-moderation")}
            onClick={onClose}
          >
            <i className="fas fa-poll-h"></i> News Moderation
          </Nav.Link>
        )}


        {userRole === "dss" && (
          <Nav.Link
            as={Link}
            to="/create-news"
            className={isActive("/create-news")}
            onClick={onClose}
          >
            <i className="fas fa-keyboard"></i> Create News
          </Nav.Link>
        )}

{/*///////////////////////////////////////////////////////////////////////////////////*/}
        <hr />
        <Nav.Link
          as={Link}
          to="/event-planning"
          className={isActive("/event-planning")}
          onClick={onClose}
        >
          <i className="fas fa-tasks"></i> Event Planning
        </Nav.Link>


        <Nav.Link
          as={Link}
          to="/requests"
          className={isActive("/requests")}
          onClick={onClose}
        >
          <i className="fas fa-edit"></i> Requests
        </Nav.Link>


        <Nav.Link
          as={Link}
          to="/booking"
          className={isActive("/booking")}
          onClick={onClose}
        >
          <i className="fas fa-door-open"></i> Room Booking
        </Nav.Link>


        <Nav.Link
          as={Link}
          to="/payments"
          className={isActive("/payments")}
          onClick={onClose}
        >
          <i className="fas fa-credit-card"></i> Payments
        </Nav.Link>        


      </Nav>
    </div>
  );
};

export default LeftSidebar;
