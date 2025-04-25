import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/DashboardDSS.css"; // or Staff

const DashboardDSS = () => {
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
        const transformed = data
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

    // Fetch DSS updates
    fetch("https://senior-project-java-backend.onrender.com/api/dss/updates", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch updates");
        return res.json();
      })
      .then((data) => {
        setUpdates(data);
      })
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
          <h1>DSS Dashboard</h1>
          <p>Welcome to your DSS portal</p>
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
              onClick={() => navigate(`/news/${item.id}`)}
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

      {/* DSS Updates */}
      <div className="updates-section">
        <div className="section-header">
          <i className="fas fa-bell"></i>
          <h3>DSS Updates</h3>
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

export default DashboardDSS;
