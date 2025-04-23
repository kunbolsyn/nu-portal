// src/components/pages/MyPage.js
import React, { useState, useEffect } from "react";
import "../../styles/MyPage.css"; // adjust if needed

const MyPage = () => {
  const [profile, setProfile] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [search, setSearch] = useState("");

  const role = localStorage.getItem("userRole");
  const accountId = localStorage.getItem("accountId");
  const token = localStorage.getItem("token");

  // Load saved contacts from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("savedContacts");
    if (saved) {
      setContacts(JSON.parse(saved));
    }
  }, []);

  // Fetch profile and clubs as before...
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        let endpoint = "";
        if (role === "student") {
          endpoint = `https://senior-project-java-backend.onrender.com/api/v1/student/accountid/${accountId}`;
        } else if (role === "faculty") {
          endpoint = `https://senior-project-java-backend.onrender.com/api/v1/teachingstaff/accountid/${accountId}`;
        } else if (role === "staff" || role === "dss") {
          endpoint = `https://senior-project-java-backend.onrender.com/api/v1/staff/accountid/${accountId}`;
        }

        const res = await fetch(endpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch profile");
        setProfile(await res.json());
      } catch (err) {
        console.error("Profile fetch error:", err);
      }
    };

    fetchProfile();

    fetch("/data/student_clubs.json")
      .then((r) => r.json())
      .then((data) => setClubs(data.slice(0, 6)))
      .catch((e) => console.error(e));
  }, [role, accountId, token]);

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  // Remove a contact (unstar)
  const removeContact = (id) => {
    const updated = contacts.filter((c) => c.id !== id);
    setContacts(updated);
    localStorage.setItem("savedContacts", JSON.stringify(updated));
  };

  const renderProfileInfo = () => {
    if (!profile) return <p>Loading profile...</p>;
    const acct = profile.account || {};

    return (
      <div className="profile-card">
        <img
          src={acct.photo?.filePath || "/images/profile.jpg"}
          alt="Profile"
          className="profile-img"
        />
        <div className="profile-info">
          <h4 className="profile-name">
            {profile.name} {profile.surname}
          </h4>
          <div className="profile-grid">
            <div>
              <i className="fas fa-envelope"></i> {acct.email}
            </div>
            <div>
              <i className="fas fa-phone"></i> {profile.phoneNumber}
            </div>
            <div>
              <i className="fas fa-calendar"></i> {profile.birthDate}
            </div>
            {role === "student" && (
              <>
                <div>
                  <i className="fas fa-calendar-alt"></i> Year{" "}
                  {profile.studyYear}
                </div>
                <div>
                  <i className="fas fa-book"></i> {profile.major}
                </div>
                <div>
                  <i className="fas fa-university"></i> {profile.school}
                </div>
              </>
            )}
            {role === "faculty" && (
              <>
                <div>
                  <i className="fas fa-graduation-cap"></i> {profile.degree}
                </div>
                <div>
                  <i className="fas fa-chalkboard-teacher"></i> {profile.title}
                </div>
                <div>
                  <i className="fas fa-school"></i> {profile.school}
                </div>
                <div>
                  <i className="fas fa-microscope"></i> {profile.specialization}
                </div>
              </>
            )}
            {(role === "staff" || role === "dss") && (
              <>
                <div>
                  <i className="fas fa-briefcase"></i> {profile.jobPosition}
                </div>
                <div>
                  <i className="fas fa-building"></i>{" "}
                  {profile.department?.title}
                </div>
                <div>
                  <i className="fas fa-at"></i>{" "}
                  {profile.department?.corporateEmail}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mypage-container">
      {/* About Me */}
      <section className="about-me-section">
        <div className="section-header">
          <i className="fas fa-user"></i>
          <h3>About Me</h3>
        </div>
        {renderProfileInfo()}
      </section>

      {/* Saved Contacts */}
      <section className="contacts-section">
        <div className="section-header">
          <i className="fas fa-star"></i>
          <h3>Saved Contacts</h3>
        </div>

        <div className="contacts-search">
          <input
            type="text"
            placeholder="Search contacts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="saved-contacts-table-wrapper">
          <table className="phonebook-table">
            <thead>
              <tr>
                <th style={{ width: 60 }} /> {/* fixed-width image col */}
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>School</th>
                <th>Department</th>
                <th style={{ width: 60 }}> {/* remove button col */}Unstar</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map((c) => (
                <tr key={c.id}>
                  <td style={{ width: 60 }}>
                    <img
                      src={c.image}
                      alt={c.name}
                      className="phonebook-profile-pic"
                      style={{ width: 50, height: 50, objectFit: "cover" }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/images/profile.jpg";
                      }}
                    />
                  </td>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.phone}</td>
                  <td>{c.school || "-"}</td>
                  <td>{c.department || "-"}</td>
                  <td style={{ textAlign: "center", width: 60 }}>
                    <button
                      className="star-btn"
                      onClick={() => removeContact(c.id)}
                    >
                      <i className="fas fa-star saved"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* My Clubs (unchanged) */}
      <section className="myclubs-section">
        <div className="section-header">
          <i className="fas fa-paw"></i>
          <h3>My Clubs</h3>
        </div>
        <div className="clubs-grid">
          {clubs.map((club, i) => (
            <div key={i} className="club-card">
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

export default MyPage;
