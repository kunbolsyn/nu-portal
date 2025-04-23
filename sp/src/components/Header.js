import React, { useState, useRef, useEffect } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/Header.css";

const Header = ({ onToggleSidebar }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="header">
      <div className="header-left">
        <div className="hamburger-btn">
          <i
            className="fas fa-bars hamburger-btn-icon"
            onClick={onToggleSidebar}
          ></i>
        </div>
        <div className="search-container">
          <Form className="search-form">
            <div className="search-box">
              <i className="fas fa-search search-icon"></i>
              <input
                type="text"
                placeholder="Search"
                className="search-input"
              />
            </div>
          </Form>
        </div>
      </div>
      {/* Profile & Notifications */}
      <div className="profile-section" ref={menuRef}>
        <i className="fas fa-bell notification-icon"></i>

        <div
          className={`profile-wrapper ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <img
            src={`images/profile.jpg`}
            alt="Profile"
            className="profile-pic"
          />
          <i
            className={`fas fa-chevron-${
              menuOpen ? "up" : "down"
            } dropdown-icon`}
          ></i>
        </div>

        {menuOpen && (
          <div className="context-menu">
            <Link to="/mypage">My Page</Link>
            <Link to="/settings">Settings</Link>
            <button onClick={handleLogout} className="logout-btn">
              Log Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
