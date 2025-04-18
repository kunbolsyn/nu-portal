// src/components/pages/Dashboard.js
import React, { useState, useEffect } from "react";
import "../../styles/Dashboard.css";
import "../../styles/NewsCards.css";
import NewsDetail from "./NewsDetail";

const Dashboard = () => {
  const [news, setNews] = useState([]);
  const [updates, setUpdates] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);

  useEffect(() => {
    // Fetch news data
    fetch("/data/news.json")
      .then((res) => res.json())
      .then((data) => setNews(data))
      .catch((error) => console.error("Error fetching news:", error));

    // Fetch updates data
    fetch("/data/updates.json")
      .then((res) => res.json())
      .then((data) => setUpdates(data))
      .catch((error) => console.error("Error fetching updates:", error));
  }, []);

  return (
    <div className="dashboard">
      {/* Banner Section */}
      <div className="banner">
        <div className="banner-overlay"></div>
        <div className="banner-text">
          <h1>Tech Talk 2024</h1>
          <p>Join us for a face-to-face talk with AI innovators!</p>
          <p className="banner-date">January 20-21, 2024 | NU Campus</p>
          <button className="learn-more-btn">Learn More</button>
        </div>
      </div>

      {/* University News */}
      <div className="news-section">
        <h2>
          <i className="fas fa-newspaper"></i> University News
        </h2>
        <div className="news-grid">
          {news.map((item, index) => (
            <div
              key={index}
              className="news-card"
              onClick={() => setSelectedNews(item)}
            >
              {item.image && <img src={item.image} alt={item.title} />}
              <h3>{item.title}</h3>
              <div className="meta">
                <p>
                  <i className="fas fa-user"></i> {item.author}
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
        <h2>
          <i className="fas fa-bell"></i> My Updates
        </h2>
        <div className="updates-list">
          {updates.map((update, index) => (
            <div key={index} className="update-item">
              <h3>{update.title}</h3>
              <p>{update.content}</p>
              <span className="update-date">{update.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* News Detail Overlay */}
      <NewsDetail item={selectedNews} onClose={() => setSelectedNews(null)} />
    </div>
  );
};

export default Dashboard;
