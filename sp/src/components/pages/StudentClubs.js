import React, { useState, useEffect } from "react";
import "../../styles/StudentClubs.css";
import ClubDetail from "./ClubDetail";
import { useLocation, useNavigate } from "react-router-dom";

const StudentClubs = () => {
  const [clubs, setClubs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterCategory, setFilterCategory] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const [selectedClub, setSelectedClub] = useState(
    location.state?.selectedClub || null
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(
      "https://senior-project-java-backend.onrender.com/api/v1/studentorganization/all",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const mappedClubs = data.map((club) => ({
          name: club.title,
          description: club.description,
          category: club.category,
          aims: club.aims,
          corpEmail: club.corpEmail,
          logo: club.logo?.filePath
            ? club.logo.filePath
            : `${process.env.PUBLIC_URL}/images/default-event.jpg`,
          fullData: club,
        }));
        setClubs(mappedClubs);
      })
      .catch((error) => console.error("Error fetching clubs data:", error));
  }, []);

  useEffect(() => {
    if (location.state?.selectedClub) {
      setSelectedClub(location.state.selectedClub);
    }
  }, [location.state]);

  const closeOverlay = () => {
    setSelectedClub(null);
    navigate(location.pathname, { replace: true, state: {} });
  };

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
      <div className="section-header">
        <i className="fas fa-users"></i>
        <h1 className="student-clubs-title">Student Clubs</h1>
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

      <div className="student-clubs-list">
        {filteredClubs.map((club, index) => (
          <div
            key={index}
            className="student-club-card"
            onClick={() => setSelectedClub(club.fullData)}
            style={{ cursor: "pointer" }}
          >
            <img src={club.logo} alt={club.name} className="student-club-img" />
            <div className="student-club-info">
              <h3 className="club-name">
                <strong>{club.name.toUpperCase()}</strong>
              </h3>
              <p className="club-category">
                <strong>Category:</strong> {club.category}
              </p>
              <p className="club-description">{club.description}</p>
            </div>
          </div>
        ))}
      </div>

      <ClubDetail item={selectedClub} onClose={closeOverlay} />
    </div>
  );
};

export default StudentClubs;
