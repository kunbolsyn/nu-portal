import React from "react";
import { Form } from "react-bootstrap";
import "../styles/Header.css";

const Header = () => (
  <div className="header">
    {/* Search Bar */}
    <div className="search-container">
      <Form className="search-form">
        <div className="search-box">
          <i className="fas fa-search search-icon"></i>
          <input type="text" placeholder="Search" className="search-input" />
        </div>
      </Form>
    </div>

    {/* Profile & Notifications */}
    <div className="profile-section">
      <i className="fas fa-bell notification-icon"></i>
      <img src={`${process.env.PUBLIC_URL}/profile.png`} alt="Profile" className="profile-pic" />
    </div>
  </div>
);

export default Header;
