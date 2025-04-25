// src/components/pages/MyPage.js
import React, { useState, useEffect } from "react";
import "../../styles/MyPage.css";

const MyPage = () => {
  const [profile, setProfile] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [activeVacationTab, setActiveVacationTab] = useState(null);
  const [newVacationPeriod, setNewVacationPeriod] = useState({ startDate: '', endDate: '' });

  const role = localStorage.getItem("userRole");
  const accountId = localStorage.getItem("accountId");
  const token = localStorage.getItem("token");

  // Vacation data state
  const [vacationData, setVacationData] = useState({
    acceptanceDate: "01/01/2019",
    vacationYears: [
      {
        beginDate: "01/01/2019",
        endDate: "31/12/2019",
        usedDays: 56,
        remainingDays: 0,
        totalDays: 56,
        periods: [
          { startDate: "22/08/2019", endDate: "15/09/2019", days: 26 },
          { startDate: "15/10/2019", endDate: "01/11/2019", days: 16 },
          { startDate: "23/12/2019", endDate: "29/12/2019", days: 7 }
        ]
      },
      // ... other years as in your original data
      {
        beginDate: "01/01/2020",
        endDate: "31/12/2020",
        usedDays: 56,
        remainingDays: 0,
        totalDays: 56,
        periods: [
          { startDate: "22/08/2019", endDate: "15/09/2019", days: 26 },
          { startDate: "15/10/2019", endDate: "01/11/2019", days: 16 },
          { startDate: "23/12/2019", endDate: "29/12/2019", days: 7 }
        ]
      },{
        beginDate: "01/01/2021",
        endDate: "31/12/2021",
        usedDays: 56,
        remainingDays: 0,
        totalDays: 56,
        periods: [
          { startDate: "22/08/2019", endDate: "15/09/2019", days: 26 },
          { startDate: "15/10/2019", endDate: "01/11/2019", days: 16 },
          { startDate: "23/12/2019", endDate: "29/12/2019", days: 7 }
        ]
      },{
        beginDate: "01/01/2022",
        endDate: "31/12/2022",
        usedDays: 56,
        remainingDays: 0,
        totalDays: 56,
        periods: [
          { startDate: "22/08/2019", endDate: "15/09/2019", days: 26 },
          { startDate: "15/10/2019", endDate: "01/11/2019", days: 16 },
          { startDate: "23/12/2019", endDate: "29/12/2019", days: 7 }
        ]
      },{
        beginDate: "01/01/2023",
        endDate: "31/12/2023",
        usedDays: 56,
        remainingDays: 0,
        totalDays: 56,
        periods: [
          { startDate: "22/08/2019", endDate: "15/09/2019", days: 26 },
          { startDate: "15/10/2019", endDate: "01/11/2019", days: 16 },
          { startDate: "23/12/2019", endDate: "29/12/2019", days: 7 }
        ]
      },
    ]
  });

  // Load saved contacts from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("savedContacts");
    if (saved) {
      setContacts(JSON.parse(saved));
    }
  }, []);

  // Fetch profile
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

  // Vacation Manager Functions
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const [day, month, year] = dateStr.split('/');
    return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
  };

  const parseDateInput = (dateStr) => {
    if (!dateStr) return null;
    const [year, month, day] = dateStr.split('-');
    return new Date(year, month - 1, day);
  };

  const calculateVacationDays = (start, end) => {
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const handleAddVacationPeriod = (yearIndex) => {
    const startDate = parseDateInput(newVacationPeriod.startDate);
    const endDate = parseDateInput(newVacationPeriod.endDate);
    
    if (startDate && endDate && startDate <= endDate) {
      const days = calculateVacationDays(startDate, endDate);
      const updatedData = JSON.parse(JSON.stringify(vacationData));
      const year = updatedData.vacationYears[yearIndex];
      
      if (days <= year.remainingDays) {
        year.periods.push({
          startDate: formatDate(newVacationPeriod.startDate.split('-').reverse().join('/')),
          endDate: formatDate(newVacationPeriod.endDate.split('-').reverse().join('/')),
          days
        });
        
        year.usedDays += days;
        year.remainingDays -= days;
        
        if (yearIndex < updatedData.vacationYears.length - 1) {
          const nextYear = updatedData.vacationYears[yearIndex + 1];
          nextYear.totalDays += year.remainingDays;
          nextYear.remainingDays += year.remainingDays;
          year.remainingDays = 0;
        }
        
        setVacationData(updatedData);
        setNewVacationPeriod({ startDate: '', endDate: '' });
        setActiveVacationTab(null);
      } else {
        alert(`Not enough remaining days (${year.remainingDays} left, ${days} requested)`);
      }
    }
  };

  const getYearFromDate = (dateStr) => {
    const [day, month, year] = dateStr.split('/');
    return parseInt(year);
  };

  const isPastYear = (year) => year < new Date().getFullYear();
  const isCurrentYear = (year) => year === new Date().getFullYear();
  const isFutureYear = (year) => year > new Date().getFullYear();

  const renderProfileInfo = () => {
    if (!profile) return <p>Loading profile...</p>;
    const acct = profile.account || {};

    return (
      <div className="profile-card">
        <img
          src={
            acct.photo?.filePath ||
            `${process.env.PUBLIC_URL}/images/profile.jpg`
          }
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

      {/* Vacation Management */}
      <section className="vacation-section">
        <div className="section-header">
          <i className="fas fa-calendar-alt"></i>
          <h3>Vacation Management</h3>
        </div>
        
        <div className="vacation-table-container">
          <table className="vacation-table">
            <thead>
              <tr>
                <th>Begin Date</th>
                <th>End Date</th>
                <th>Used Days</th>
                <th>Remaining Days</th>
                <th>Total Days</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {vacationData.vacationYears.map((year, index) => {
                const yearValue = getYearFromDate(year.beginDate);
                return (
                  <tr key={index}>
                    <td>{year.beginDate}</td>
                    <td>{year.endDate}</td>
                    <td>{year.usedDays}</td>
                    <td>{year.remainingDays}</td>
                    <td>{year.totalDays}</td>
                    <td>
                      {isPastYear(yearValue) ? (
                        <button 
                          className="calendar-icon past" 
                          onClick={() => setActiveVacationTab(activeVacationTab === index ? null : index)}
                        >
                          📅
                        </button>
                      ) : (
                        <button 
                          className={`calendar-icon ${isCurrentYear(yearValue) ? 'current' : 'future'}`} 
                          onClick={() => setActiveVacationTab(index)}
                        >
                          📅
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {activeVacationTab !== null && (
          <div className="vacation-modal">
            <div className="vacation-modal-content">
              {isPastYear(getYearFromDate(vacationData.vacationYears[activeVacationTab].beginDate)) ? (
                <>
                  <h4>Vacation Periods for {vacationData.vacationYears[activeVacationTab].beginDate} - {vacationData.vacationYears[activeVacationTab].endDate}</h4>
                  {vacationData.vacationYears[activeVacationTab].periods.length > 0 ? (
                    <ul className="vacation-periods-list">
                      {vacationData.vacationYears[activeVacationTab].periods.map((period, i) => (
                        <li key={i}>
                          {period.startDate} - {period.endDate} ({period.days} days)
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No vacation periods recorded.</p>
                  )}
                </>
              ) : (
                <>
                  <h4>Add Vacation Period for {vacationData.vacationYears[activeVacationTab].beginDate} - {vacationData.vacationYears[activeVacationTab].endDate}</h4>
                  <div className="vacation-date-inputs">
                    <div>
                      <label>Start Date:</label>
                      <input 
                        type="date" 
                        value={newVacationPeriod.startDate}
                        onChange={(e) => setNewVacationPeriod({...newVacationPeriod, startDate: e.target.value})}
                      />
                    </div>
                    <div>
                      <label>End Date:</label>
                      <input 
                        type="date" 
                        value={newVacationPeriod.endDate}
                        onChange={(e) => setNewVacationPeriod({...newVacationPeriod, endDate: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="vacation-modal-actions">
                    <button 
                      className="vacation-add-btn"
                      onClick={() => handleAddVacationPeriod(activeVacationTab)}
                    >
                      Add Period
                    </button>
                  </div>
                </>
              )}
              <button 
                className="vacation-close-btn" 
                onClick={() => setActiveVacationTab(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
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
                <th style={{ width: 60 }} />
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>School</th>
                <th>Department</th>
                <th style={{ width: 60 }}>Unstar</th>
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
                        e.target.src = "images/profile.jpg";
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
    </div>
  );
};

export default MyPage;