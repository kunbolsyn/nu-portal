// src/components/pages/DashboardStudent.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/DashboardStudent.css";
import "../../styles/NewsCards.css";

const DashboardStudent = () => {
  const [news, setNews] = useState([]);
  const [updates, setUpdates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Fetch university news from backend
    fetch("https://senior-project-java-backend.onrender.com/api/news/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch news");
        return res.json();
      })
      .then((data) => {
        const acceptedNews = data.filter((item) => item.status === "accepted");

        const transformed = acceptedNews
          .map((item) => ({
            id: item.news_id,
            title: item.newsTitle,
            name: item.name || "Unknown",
            surname: item.surname || "",
            username: item.email,
            date: item.newsDatePosted,
            content: item.text_content,
            image: item.photo?.filePath
              ? item.photo.filePath
              : `${process.env.PUBLIC_URL}/images/default-news.jpg`,
          }))
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 4);
        setNews(transformed);
      })
      .catch((err) => console.error("Error fetching news:", err));

    // Fetch your updates (still local or your updates endpoint)
    fetch("/data/updates.json")
      .then((res) => res.json())
      .then((data) => setUpdates(data))
      .catch((err) => console.error("Error fetching updates:", err));
  }, []);

  if (news.length === 0) {
    return <div className="dashboard">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard">
      <div className="banner">
        <div className="banner-overlay" />
        <div className="banner-text">
          <h1>Tech Talk 2024</h1>
          <p>Join us for a face-to-face talk with AI innovators!</p>
          <p className="banner-date">January 20-21, 2024 | NU Campus</p>
          <button className="learn-more-btn">Learn More</button>
        </div>
      </div>

      {/* University News */}
      <div className="news-section">
        <div className="section-header">
          <i className="fas fa-newspaper"></i>
          <h3>Last News</h3>
        </div>

        <div className="news-grid">
          {news.map((item) => (
            <div
              key={item.id}
              className="news-card"
              onClick={() => navigate(`/news/${item.id}`)} // navigate to NewsPage
              style={{ cursor: "pointer" }}
            >
              <img src={item.image} alt={item.title} />
              <h3>{item.title}</h3>
              <div className="meta">
                <p>
                  <i className="fas fa-user"></i> {item.name} {item.surname}
                </p>
                <p>
                  <i className="fas fa-calendar-alt"></i> {item.date}
                </p>
              </div>
              <p className="description">{item.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* My Updates */}
      <div className="updates-section">
        <div className="section-header">
          <i className="fas fa-bell"></i>
          <h3>My Updates</h3>
        </div>
        <div className="updates-list">
          {updates.map((update, idx) => (
            <div key={idx} className="update-item">
              <h3>{update.title}</h3>
              <p>{update.content}</p>
              <span className="update-date">{update.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardStudent;
