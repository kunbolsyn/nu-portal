import React, { useState, useRef, useEffect } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/Header.css";

const Header = ({ onToggleSidebar }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [posts, setPosts] = useState([]);

  const menuRef = useRef(null);
  const notifRef = useRef(null);

  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");
  const API_BASE =
    process.env.REACT_APP_API_BASE ||
    "https://senior-project-java-backend.onrender.com";

  const hasNotifications = events.length > 0 || posts.length > 0;

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/nu-portal";
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch events and news on mount
  useEffect(() => {
    if (!username || !token) return;

    const fetchEvents = async () => {
      try {
        const res = await fetch(
          `${API_BASE}/api/events/email/${encodeURIComponent(username)}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch events");
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error("Error loading events:", err);
      }
    };

    const fetchPosts = async () => {
      try {
        const res = await fetch(
          `${API_BASE}/api/news/email/${encodeURIComponent(username)}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        if (res.status === 204) {
          setPosts([]);
          return;
        }
        if (!res.ok) {
          console.warn("Error loading posts:", await res.text());
          return;
        }

        const data = await res.json();
        setPosts(data.reverse());
      } catch (err) {
        console.error("Error loading posts:", err);
      }
    };

    fetchEvents();
    fetchPosts();
  }, [username, token, API_BASE]);

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

      <div className="profile-section">
        {/* Notification Bell */}
        <div className="notification-wrapper" ref={notifRef}>
          <i
            className="fas fa-bell notification-icon"
            onClick={() => setNotifOpen(!notifOpen)}
          ></i>

          {notifOpen && hasNotifications && (
            <div className="notif-dropdown">
              <strong>Notifications</strong>
              <ul className="notif-list">
                {events.slice(0, 3).map((ev) => (
                  <li key={ev.eventId}>
                    📅 <b>{ev.eventTitle}</b>
                    <br />
                    <small>{ev.date}</small>
                    <span className="status">{ev.type}</span>
                  </li>
                ))}
                {posts.slice(0, 3).map((post) => (
                  <li key={post.newsTitle + post.newsDatePosted}>
                    <i className="fas fa-news"></i>
                    {post.newsTitle}
                    <br />
                    <small>
                      {post.newsDatePosted || post.newsDateRequestSent}
                    </small>
                    <span className="status">{post.status}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Profile & Dropdown */}
        <div
          className="profile-container" // ← wrapper around both profile and menu
          ref={menuRef}
        >
          <div
            className={`profile-wrapper ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <img
              src={`${process.env.PUBLIC_URL}/images/profile.jpg`}
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
              <button onClick={handleLogout} className="logout-btn">
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
