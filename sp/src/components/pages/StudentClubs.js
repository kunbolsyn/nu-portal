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
        // Adapt backend data to match UI format
        const mappedClubs = data.map((club) => ({
          name: club.title,
          description: club.description,
          category: club.category,
          aims: club.aims,
          members: "N/A", // You can replace this if you have member count
          status: "Active", // If API doesn't return status, default to Active
          logo: club.president?.account?.photo?.filePath || "club_logo.png",
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

      <div className="student-clubs-list">
        {filteredClubs.map((club, index) => (
          <div
            key={index}
            className="student-club-card"
            onClick={() => setSelectedClub(club.fullData)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={
                club.logo.startsWith("http")
                  ? club.logo
                  : `images/default-news.jpg`
              }
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

      <ClubDetail item={selectedClub} onClose={closeOverlay} />
    </div>
  );
};

export default StudentClubs;
