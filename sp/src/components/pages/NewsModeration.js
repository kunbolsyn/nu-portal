import React, { useState, useEffect } from "react";
import "../../styles/NewsModeration.css";

const tabs = ["Unmoderated", "Moderated", "Deleted"];

const NewsModeration = () => {
  const [activeTab, setActiveTab] = useState("Unmoderated");
  const [news, setNews] = useState([]);

  useEffect(() => {
    // Replace with actual fetch call
    setNews([
      {
        id: 1,
        title: "Student Film Festival to Showcase Local Talent",
        author: "Alex Tinez",
        date: "2024-11-20",
        category: "Academic",
        content:
          "During the visit, NU presented its educational and research opportunities...",
        image: "/images/filmfestival.jpg",
        status: "Unmoderated",
      },
    ]);
  }, []);

  const updateStatus = (id, newStatus) => {
    setNews((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
  };

  const filteredNews = news.filter((item) => item.status === activeTab);

  return (
    <div className="news-moderation-container">
      <div className="my-events-header">
        <h3>
          <i className="fas fa-newspaper"></i> News Moderation
        </h3>
      </div>
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={tab === activeTab ? "active-tab" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="news-cards">
        {filteredNews.map((item) => (
          <div key={item.id} className="news-card">
            <img src={item.image} alt={item.title} />
            <h4>{item.title}</h4>
            <p><i className="fas fa-user"></i> {item.author}</p>
            <p><i className="fas fa-calendar-alt"></i> {item.date}</p>
            {activeTab === "Unmoderated" && (
              <>
                <p className="category">Category: {item.category}</p>
                <p>{item.content}</p>
              </>
            )}
            <div className="action-buttons">
              {activeTab === "Unmoderated" && (
                <>
                  <button className="approve-btn" onClick={() => updateStatus(item.id, "Moderated")}>Approve</button>
                  <button className="delete-btn" onClick={() => updateStatus(item.id, "Deleted")}>Delete</button>
                </>
              )}
              {activeTab === "Moderated" && (
                <button className="delete-btn" onClick={() => updateStatus(item.id, "Deleted")}>Delete</button>
              )}
              {activeTab === "Deleted" && (
                <button className="restore-btn" onClick={() => updateStatus(item.id, "Unmoderated")}>Restore</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsModeration;
