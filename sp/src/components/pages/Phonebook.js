// src/components/pages/Phonebook.js
import React, { useState, useEffect } from "react";
import "../../styles/Phonebook.css";

const TABS = ["Students", "Teaching Staff", "Staff", "Student Clubs", "Others"];
const API_BASE = "https://senior-project-java-backend.onrender.com";

const Phonebook = () => {
  const [contacts, setContacts] = useState([]);
  const [savedContacts, setSavedContacts] = useState([]);
  const [activeTab, setActiveTab] = useState("Students");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // Load saved contacts once (from localStorage / fallback JSON)
  useEffect(() => {
    const stored = localStorage.getItem("savedContacts");
    if (stored) {
      setSavedContacts(JSON.parse(stored));
    } else {
      fetch("/data/saved_contacts.json")
        .then((r) => r.json())
        .then((data) => {
          setSavedContacts(data);
          localStorage.setItem("savedContacts", JSON.stringify(data));
        })
        .catch(console.error);
    }
  }, []);

  // Fetch the right endpoint when tab changes
  useEffect(() => {
    let path;
    switch (activeTab) {
      case "Students":
        path = "/api/v1/student/all";
        break;
      case "Teaching Staff":
        path = "/api/v1/teachingstaff/all";
        break;
      case "Staff":
        path = "/api/v1/staff/all";
        break;
      case "Student Clubs":
        path = "/api/v1/studentorganization/all";
        break;
      case "Others":
        path = "/api/v1/department/all";
        break;
      default:
        return;
    }

    setLoading(true);
    fetch(`${API_BASE}${path}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`${activeTab} fetch failed`);
        return res.json();
      })
      .then((data) => {
        const formatted = data.map((item) => {
          switch (activeTab) {
            case "Students":
              return {
                id: item.id,
                name: `${item.name} ${item.surname}`,
                email: item.account.email,
                phone: item.phoneNumber,
                school: item.school,
                department: item.major,
                gpa: item.gpa,
                image: item.account.photo?.filePath || "/images/profile.jpg",
              };
            case "Teaching Staff":
              return {
                id: item.account.email,
                name: `${item.name} ${item.surname}`,
                email: item.account.email,
                phone: item.phoneNumber,
                school: item.school,
                department: item.specialization,
                image: item.account.photo?.filePath || "/images/profile.jpg",
              };
            case "Staff":
              return {
                id: item.account.email,
                name: `${item.name} ${item.surname}`,
                email: item.account.email,
                phone: item.phoneNumber,
                school: item.department?.title || "",
                department: item.jobPosition,
                image: item.account.photo?.filePath || "/images/profile.jpg",
              };
            case "Student Clubs":
              return {
                id: item.corpEmail,
                name: `${item.title} (Pres: ${item.president.name} ${item.president.surname})`,
                email: item.corpEmail,
                phone: item.president.phoneNumber,
                school: item.president.school,
                department: item.president.major,
                image:
                  item.president.account.photo?.filePath ||
                  "/images/profile.jpg",
              };
            case "Others":
              return {
                id: item.corporateEmail,
                name: item.title,
                email: item.corporateEmail,
                phone: item.phoneNumber,
                department: item.description,
                image: "/images/profile.jpg",
              };
            default:
              return null;
          }
        });
        setContacts(formatted.filter(Boolean));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [activeTab]);

  const toggleSave = (c) => {
    const isSaved = savedContacts.some((x) => x.id === c.id);
    const updated = isSaved
      ? savedContacts.filter((x) => x.id !== c.id)
      : [...savedContacts, c];
    setSavedContacts(updated);
    localStorage.setItem("savedContacts", JSON.stringify(updated));
  };

  // Filter by name only
  const filtered = contacts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="phonebook-container">
      <div className="section-header">
        <i className="fas fa-address-book" />
        <h3>Phonebook</h3>
      </div>

      <div className="phonebook-tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={tab === activeTab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="phonebook-filters">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Loading {activeTab}…</p>
      ) : (
        <div className="phonebook-table-wrapper">
          <table className="phonebook-table">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                {activeTab === "Students" && <th>ID</th>}
                <th>Phone</th>
                {["Students", "Teaching Staff", "Student Clubs"].includes(
                  activeTab
                ) && <th>School</th>}
                {activeTab === "Staff" && <th>Department</th>}
                {activeTab === "Others" && <th>Description</th>}
                {activeTab === "Students" && <th>Major</th>}
                {activeTab === "Teaching Staff" && <th>Specialization</th>}
                {activeTab === "Staff" && <th>Position</th>}
                {activeTab === "Student Clubs" && <th>Major</th>}
                {activeTab === "Students" && <th>GPA</th>}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => {
                const isSaved = savedContacts.some((x) => x.id === c.id);
                return (
                  <tr key={c.id}>
                    <td>
                      <img
                        src={c.image}
                        alt={c.name}
                        className="phonebook-profile-pic"
                      />
                    </td>
                    <td>{c.name}</td>
                    <td>{c.email}</td>
                    {activeTab === "Students" && <td>{c.id}</td>}
                    <td>{c.phone}</td>
                    {["Students", "Teaching Staff", "Student Clubs"].includes(
                      activeTab
                    ) && <td>{c.school}</td>}
                    {activeTab === "Staff" && <td>{c.school}</td>}
                    {activeTab === "Others" && <td>{c.department}</td>}
                    {activeTab === "Students" && <td>{c.department}</td>}
                    {activeTab === "Teaching Staff" && <td>{c.department}</td>}
                    {activeTab === "Staff" && <td>{c.department}</td>}
                    {activeTab === "Student Clubs" && <td>{c.department}</td>}
                    {activeTab === "Students" && <td>{c.gpa ?? "-"}</td>}
                    <td>
                      <button
                        className="star-btn"
                        onClick={() => toggleSave(c)}
                      >
                        <i
                          className={
                            isSaved ? "fas fa-star saved" : "far fa-star"
                          }
                        />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="pagination-info">
            Showing {filtered.length} of {contacts.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default Phonebook;
