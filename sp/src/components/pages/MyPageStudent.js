// src/components/pages/MyPage.js
import React, { useState, useEffect } from "react";
import "../../styles/MyPageStudent.css";

const MyPageStudent = () => {
  const [contacts, setContacts] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/data/student_clubs.json")
      .then((res) => res.json())
      .then((data) => setClubs(data.slice(0, 6)))
      .catch((err) => console.error("Error fetching clubs:", err));

    fetch("/data/saved_contacts.json")
      .then((res) => res.json())
      .then((data) => setContacts(data))
      .catch((err) => console.error("Error fetching contacts:", err));
  }, []);

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mypage-container">
      <section className="about-me-section">
        <div className="section-header">
          <i className="fas fa-user"></i>
          <h3>About Me</h3>
        </div>

        <div className="profile-card">
          <img
            src="/images/alisher.jpg"
            alt="Profile"
            className="profile-img"
          />
          <div className="profile-info">
            <h4 className="profile-name">Name Surname</h4>
            <div className="profile-grid">
              <div>
                <i className="fas fa-envelope"></i> name.surname@nu.edu.kz
              </div>
              <div>
                <i className="fas fa-phone"></i> +X(XXX)XXX XX XX
              </div>
              <div>
                <i className="fas fa-calendar"></i> Year of Study
              </div>
              <div>
                <i className="fas fa-book"></i> Major
              </div>
              <div>
                <i className="fas fa-map-marker-alt"></i> Department
              </div>
              <div>
                <i className="fas fa-graduation-cap"></i> GPA
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contacts-section">
        <div className="section-header">
          <i className="fas fa-star"></i>
          <h3>Saved Contacts</h3>
        </div>
        <div className="contacts-search">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="filter-btn">
            <i className="fas fa-filter"></i> Filters
          </button>
        </div>
        <div className="contacts-grid">
          {filteredContacts.map((contact, index) => (
            <div key={index} className="contact-card">
              <img src={contact.image} alt={contact.name} />
              <p>{contact.name}</p>
            </div>
          ))}
        </div>
        <div className="pagination-info">
          1–{filteredContacts.length} of {contacts.length}
        </div>
      </section>

      {/* My Clubs */}
      <section className="myclubs-section">
        <div className="section-header">
          <i className="fas fa-paw"></i>
          <h3>My Clubs</h3>
        </div>
        <div className="clubs-grid">
          {clubs.map((club, index) => (
            <div key={index} className="club-card">
              <img src={`/images/${club.logo}`} alt={club.name} />
              <p>{club.name}</p>
            </div>
          ))}
        </div>
        <div className="pagination-info">
          1–{clubs.length} of {clubs.length}
        </div>
      </section>
    </div>
  );
};

export default MyPageStudent;
