import React, { useState, useEffect } from "react";
import "../../styles/StudentClubs.css";

const StudentClubs = () => {
  const [clubs, setClubs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterCategory, setFilterCategory] = useState("");

  useEffect(() => {
    // Fetch data from student_clubs.json
    fetch("/data/student_clubs.json")
      .then((response) => response.json())
      .then((data) => setClubs(data))
      .catch((error) => console.error("Error fetching clubs data:", error));
  }, []);

  // Filter clubs based on status, category, and search query
  const filteredClubs = clubs.filter((club) => {
    const matchesStatus =
      filterStatus === "All" || club.status === filterStatus;
    const matchesCategory =
      filterCategory === "" ||
      club.category.toLowerCase().includes(filterCategory.toLowerCase());
    const matchesSearch = club.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesStatus && matchesCategory && matchesSearch;
  });

  return (
    <div className="student-clubs-container">
      {/* Header with filters */}
      <div className="section-header">
        <i className="fas fa-users"></i>
        <h3 className="student-clubs-title">Student Clubs</h3>
      </div>
      <div className="student-clubs-filters">
        <input
          type="text"
          placeholder="Search clubs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="student-clubs-search"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="student-clubs-status"
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="student-clubs-category"
        >
          <option value="">All Categories</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Sports">Sports</option>
          <option value="Recreation">Recreation</option>
          <option value="Arts">Arts</option>
        </select>
        <button className="student-clubs-filter-button">Filter</button>
      </div>

      {/* Displaying filtered clubs */}
      <div className="student-clubs-list">
        {filteredClubs.map((club, index) => (
          <div key={index} className="student-club-card">
            <img
              src={`/images/${club.logo}`} // Assuming logo is in /images/ directory
              alt={club.name}
              className="student-club-img"
            />
            <div className="student-club-info">
              <h3 className="club-name">
                <strong>{club.name.toUpperCase()}</strong>
              </h3>
              <p className="club-status">{club.status}</p>
              <p className="club-category">
                <strong>Category:</strong> {club.category}
              </p>
              <p className="club-members">
                <strong>Members:</strong> {club.members}
              </p>
              <p className="club-description">{club.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentClubs;
