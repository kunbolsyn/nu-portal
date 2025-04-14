// src/components/pages/Phonebook.js
import React, { useState, useEffect } from "react";
import "../../styles/Phonebook.css";

const TABS = [
  "Students",
  "Teaching Staff",
  "University Employees",
  "Student Clubs",
  "Organizations",
  "Offices",
  "Campus Services",
  "Emergency Contacts",
];

const Phonebook = () => {
  const [contacts, setContacts] = useState([]);
  const [savedContacts, setSavedContacts] = useState([]);
  const [activeTab, setActiveTab] = useState("Students");
  const [search, setSearch] = useState("");
  const [schoolFilter, setSchoolFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");

  useEffect(() => {
    fetch("/data/phonebook.json")
      .then((res) => res.json())
      .then((data) => setContacts(data))
      .catch((err) => console.error("Error fetching phonebook:", err));

    fetch("/data/saved_contacts.json")
      .then((res) => res.json())
      .then((data) => setSavedContacts(data))
      .catch((err) => console.error("Error fetching saved contacts:", err));
  }, []);

  const toggleSave = (contact) => {
    const isSaved = savedContacts.some((c) => c.email === contact.email);
    const updated = isSaved
      ? savedContacts.filter((c) => c.email !== contact.email)
      : [...savedContacts, contact];
  
    setSavedContacts(updated);
  
    // Send updated saved contacts to backend
    fetch("/api/save-contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to save contacts.");
      console.log("Contacts updated successfully.");
    })
    .catch((err) => console.error(err));
  };
  

  const filtered = contacts.filter(
    (c) =>
      c.category === activeTab &&
      c.name.toLowerCase().includes(search.toLowerCase()) &&
      (schoolFilter === "" || c.school === schoolFilter) &&
      (departmentFilter === "" || c.department === departmentFilter)
  );

  return (
    <div className="phonebook-container">
      <h2><i className="fas fa-address-book"></i> Phonebook</h2>

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
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={schoolFilter} onChange={(e) => setSchoolFilter(e.target.value)}>
          <option value="">School</option>
          {[...new Set(contacts.map((c) => c.school).filter(Boolean))].map((school) => (
            <option key={school} value={school}>{school}</option>
          ))}
        </select>
        <select value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)}>
          <option value="">Department</option>
          {[...new Set(contacts.map((c) => c.department).filter(Boolean))].map((dep) => (
            <option key={dep} value={dep}>{dep}</option>
          ))}
        </select>
      </div>

      <div className="phonebook-table">
        {filtered.map((contact, index) => {
          const isSaved = savedContacts.some((c) => c.email === contact.email);
          return (
            <div key={index} className="phonebook-row">
              <img src={contact.image} alt={contact.name} className="profile-pic" />
              <span>{contact.name}</span>
              <span>{contact.email}</span>
              <span>{contact.id}</span>
              <span>{contact.phone}</span>
              <span>{contact.school}</span>
              <span>{contact.department}</span>
              <span>{contact.gpa || "-"}</span>
              <button className="star-btn" onClick={() => toggleSave(contact)}>
                <i className={isSaved ? "fas fa-star saved" : "far fa-star"}></i>
              </button>
            </div>
          );
        })}
        <div className="pagination-info">
          1–{filtered.length} of {contacts.filter((c) => c.category === activeTab).length}
        </div>
      </div>
    </div>
  );
};

export default Phonebook;
