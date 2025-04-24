import React, { useEffect, useState } from "react";
import "../../styles/NewsModeration.css";

// Mapping between frontend labels and backend status values
const statusMap = {
  unmoderated: "waiting",
  moderated: "accepted",
  deleted: "rejected",
};

// Mapping backend values to frontend labels
const frontendStatusMap = {
  waiting: "unmoderated",
  accepted: "moderated",
  rejected: "deleted",
};

const NewsModeration = () => {
  const [news, setNews] = useState([]);
  const [tab, setTab] = useState("unmoderated");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("All");
  const [sortOption, setSortOption] = useState("");

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
          title: item.newsTitle || "",
          name: item.name || "Unknown",
          surname: item.surname || "",
          username: item.email || "",
          date: item.newsDatePosted || "",
          content: item.text_content || "",
          image: item.photo?.filePath
            ? item.photo.filePath
            : `${process.env.PUBLIC_URL}/images/default-news.jpg`,
          status: frontendStatusMap[item.status] || "unmoderated",
        }));
        setNews(transformed);
      })
      .catch((error) => console.error("Error fetching news:", error));
  }, []);

  const patchStatus = async (id, newFrontendStatus) => {
    const token = localStorage.getItem("token");
    const backendStatus = statusMap[newFrontendStatus];

    try {
      const res = await fetch(
        `https://senior-project-java-backend.onrender.com/api/news/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: backendStatus }),
        }
      );

      if (!res.ok) {
        console.error("Failed to update news status:", await res.text());
        return;
      }

      setNews((prev) =>
        prev.map((n) => (n.id === id ? { ...n, status: newFrontendStatus } : n))
      );
    } catch (err) {
      console.error("Network error during status update:", err);
    }
  };

  const tabs = ["unmoderated", "moderated", "deleted"];
  const authors = [
    "All",
    ...new Set(news.map((n) => `${n.name} ${n.surname}`.trim())),
  ];

  const filteredNews = news
    .filter((n) => n.status === tab)
    .filter(
      (n) =>
        n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (n) =>
        selectedAuthor === "All" ||
        `${n.name} ${n.surname}`.trim() === selectedAuthor
    )
    .sort((a, b) => {
      if (sortOption === "title") return a.title.localeCompare(b.title);
      if (sortOption === "date-asc") return a.date.localeCompare(b.date);
      if (sortOption === "date-desc") return b.date.localeCompare(a.date);
      return 0;
    });

  return (
    <div className="news-moderation-container">
      <div className="news-moderation-header">
        <h3>
          <i className="fas fa-check-double"></i> News Moderation
        </h3>
        <div className="news-moderation-controls">
          <input
            className="news-moderation-input"
            type="text"
            placeholder="Key words..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="news-moderation-select"
            value={selectedAuthor}
            onChange={(e) => setSelectedAuthor(e.target.value)}
          >
            {authors.map((a, i) => (
              <option key={i} value={a}>
                {a}
              </option>
            ))}
          </select>

          <select
            className="news-moderation-select"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">Sort by</option>
            <option value="title">Title</option>
            <option value="date-asc">Date ↑</option>
            <option value="date-desc">Date ↓</option>
          </select>
        </div>
      </div>

      <div className="moderation-tabs">
        {tabs.map((t) => (
          <div
            key={t}
            className={`moderation-tab ${t} ${tab === t ? "active" : ""}`}
            onClick={() => setTab(t)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}{" "}
            <span className="count">
              {news.filter((n) => n.status === t).length}
            </span>
          </div>
        ))}
      </div>

      <div className="news-card-grid">
        {filteredNews.map((n) => (
          <div key={n.id} className="news-card">
            <img src={n.image} alt={n.title} className="news-image" />
            <h4 className="news-title">{n.title}</h4>
            <div className="news-meta">
              <p>
                <i className="fas fa-user"></i> {n.name} {n.surname}
              </p>
              <p>
                <i className="fas fa-calendar-alt"></i> {n.date}
              </p>
            </div>
            <p className="news-description">{n.content}</p>
            <div className="news-actions">
              {tab === "unmoderated" && (
                <>
                  <button
                    className="approve-btn"
                    onClick={() => patchStatus(n.id, "moderated")}
                  >
                    Approve
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => patchStatus(n.id, "deleted")}
                  >
                    Reject
                  </button>
                </>
              )}
              {tab === "moderated" && (
                <button
                  className="delete-btn"
                  onClick={() => patchStatus(n.id, "deleted")}
                >
                  Reject
                </button>
              )}
              {tab === "deleted" && (
                <button
                  className="restore-btn"
                  onClick={() => patchStatus(n.id, "unmoderated")}
                >
                  Restore
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsModeration;
