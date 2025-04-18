import React from "react";
import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const userRole = localStorage.getItem("userRole");

  const isActive = (path) => (location.pathname === path ? "active" : "");

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/"; // full reload after logout
  };

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <Link to="/dashboard">
          <img
            src={`${process.env.PUBLIC_URL}/NU-logo.png`}
            alt="NU Logo"
            className="full-logo"
          />
        </Link>
      </div>

      <Nav className="flex-column">
        <Nav.Link as={Link} to="/dashboard" className={isActive("/dashboard")}>
          <i className="fas fa-home"></i> Dashboard
        </Nav.Link>
        <Nav.Link as={Link} to="/news" className={isActive("/news")}>
          <i className="fas fa-newspaper"></i> News
        </Nav.Link>
        <Nav.Link as={Link} to="/events" className={isActive("/events")}>
          <i className="fas fa-calendar-alt"></i> Events
        </Nav.Link>
        <Nav.Link as={Link} to="/calendar" className={isActive("/calendar")}>
          <i className="fas fa-calendar"></i> Calendar
        </Nav.Link>
        <Nav.Link as={Link} to="/phonebook" className={isActive("/phonebook")}>
          <i className="fas fa-address-book"></i> Phonebook
        </Nav.Link>
        <Nav.Link as={Link} to="/studentclubs" className={isActive("/studentclubs")}>
          <i className="fas fa-users"></i> Student Clubs
        </Nav.Link>
        <Nav.Link as={Link} to="/mypage" className={isActive("/mypage")}>
          <i className="fas fa-user"></i> My Page
        </Nav.Link>

        <hr />

        {userRole !== "staff" && (
          <Nav.Link as={Link} to="/event-planning" className={isActive("/event-planning")}>
            <i className="fas fa-tasks"></i> Event Planning
          </Nav.Link>
        )}
        {userRole === "student" && (
          <Nav.Link as={Link} to="/suggest-news" className={isActive("/suggest-news")}>
            <i className="fas fa-edit"></i> Suggest News
          </Nav.Link>
        )}

        <hr />

        {/* ✅ Settings Link (Restored) */}
        <Nav.Link as={Link} to="/settings" className={isActive("/settings")}>
          <i className="fas fa-cog"></i> Settings
        </Nav.Link>

        <Nav.Link onClick={handleLogout} className="logout">
          <i className="fas fa-sign-out-alt"></i> Logout
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
