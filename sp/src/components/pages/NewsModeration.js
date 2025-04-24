import React, { useEffect, useState } from "react";
import "../../styles/NewsModeration.css";

const NewsModeration = () => {
  const [news, setNews] = useState([]);
  const [tab, setTab] = useState("unmoderated");

  useEffect(() => {
    const token = localStorage.getItem("token");

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
        const transformed = data.map((item) => ({
          id: item.news_id,
          title: item.newsTitle,
          name: item.name || "Unknown",
          surname: item.surname || "",
          username: item.email,
          date: item.newsDatePosted,
          content: item.text_content,
          image:
            item.photos.length > 0
              ? item.photos[0].filePath
              : `${process.env.PUBLIC_URL}/images/default-news.jpg`,
          status: item.status || "unmoderated"
        }));
        setNews(transformed);
      })
      .catch((error) => console.error("Error fetching news:", error));
  }, []);

  const updateStatus = (id, newStatus) => {
    setNews((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  const tabs = ["unmoderated", "moderated", "deleted"];

  return (
    <div className="news-moderation-container">
      <div className="news-moderation-header">
        <h3><i className="fas fa-check-double"></i> News Moderation</h3>
      </div>

      <div className="moderation-tabs">
        {tabs.map((t) => (
          <div
            key={t}
            className={`moderation-tab ${t} ${tab === t ? "active" : ""}`}
            onClick={() => setTab(t)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
            <span className="count">{news.filter((n) => n.status === t).length}</span>
          </div>
        ))}
      </div>

      <div className="news-card-grid">
        {news.filter((item) => item.status === tab).map((item) => (
          <div key={item.id} className="news-card">
            <img src={item.image} alt={item.title} className="news-image" />
            <h4 className="news-title">{item.title}</h4>
            <div className="news-meta">
              <p><i className="fas fa-user"></i> {item.name} {item.surname}</p>
              <p><i className="fas fa-calendar-alt"></i> {item.date}</p>
            </div>
            <p className="news-description">{item.content}</p>

            <div className="news-actions">
              {tab === "unmoderated" && (
                <>
                  <button className="approve-btn" onClick={() => updateStatus(item.id, "moderated")}>Approve</button>
                  <button className="delete-btn" onClick={() => updateStatus(item.id, "deleted")}>Delete</button>
                </>
              )}
              {tab === "moderated" && (
                <button className="delete-btn" onClick={() => updateStatus(item.id, "deleted")}>Delete</button>
              )}
              {tab === "deleted" && (
                <button className="restore-btn" onClick={() => updateStatus(item.id, "unmoderated")}>Restore</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsModeration;
